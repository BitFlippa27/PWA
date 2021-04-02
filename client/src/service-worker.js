import { setCacheNameDetails } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, matchPrecache } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies';
import {  getRequest, removeRequestObject, getAllRequestObjects,addMongoID, getMongoID, getKeyPath, addIdToRemove } from './dexie';
import { pushRequest, toObject, toRequest } from "./queue";
const MAX_RETENTION_TIME = 60 * 24 * 7; // 7 days in minutes


const version = 8;
var isLoggedIn = false;
var isOnline = true;
var token;
var queue = [];
var refetch = true;
var count = 0;

self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);
self.addEventListener("message", onMessage);
self.addEventListener("sync", onSync);

main();


setCacheNameDetails({
  prefix: 'goodSync',
  precache: 'precache',
  runtime: "runtimeCache"
});

precacheAndRoute(self.__WB_MANIFEST);


registerRoute(
  /.*(?:googleapis|bootstrapcdn|fontawesome)\.com.*$/,
  new StaleWhileRevalidate({cacheName: "goodSync-3rdParty"})
  );

 registerRoute(
   "http://localhost:5555/api/auth",
   loginHandler, "POST"
 );

 registerRoute(
  /http:\/\/localhost:5555\/api\/zips\/.*/, 
  dataRemoveHandler, "DELETE"
);

registerRoute(
  "http://localhost:5555/api/zips", 
  dataUploadHandler, "POST"
);




async function loginHandler({ request }) {
  try {
    let res = await fetch(request);  
    if(res && res.ok) {
      return res;
    }
    else {
      let res = await matchPrecache("/offline");

      return res;
    }
  } 
  catch (err) {
    console.error(err);
  }
}


async function dataUploadHandler({ request }) {
  try {
    var req = request.clone();
    if(isOnline) {
      let res = await fetch(request);
      if(res && res.ok) {
        return res;
      }
      //hierdurch fangen wir ab wenn Server Down aber CLient Online
      else {
        await sendMessage({ upload: false});
        await pushRequest(req, "upload");
        let res = await checkData();
        console.log("dataUploadHandler", res); 

        return res;
      }
    }
    else {
      await sendMessage({ upload: false});
      await pushRequest(req, "upload");
      let res = await replayFetch();
      console.log("dataUploadHandler", res);

      return res;
    }
  }
  catch(err) {
    console.error(err);
  } 
}


async function dataRemoveHandler({ request }) {
  try {
    var req = request.clone();
    if(isOnline) {
      const res = await fetch(request);  
      if(res && res.ok) {
        return res;
      }
      //hierdurch fangen wir ab wenn Server Down aber CLient Online
      else {
        await sendMessage({ upload: false});
        await pushRequest(req, "remove");
        let res = await replayFetch();
        console.log("dataRemoveHandler", res); 

        return res;
      }
    }
    else {
        await sendMessage({ upload: false});
        await pushRequest(req, "remove");
        let res = await replayFetch();
        console.log("dataRemoveHandler", res);

        return res;
    }
  }
  catch(err) {
    console.error(err);
  }
}
/*
async function dataFetchHandler({ request }) {
  fetchAllData();
}
*/

async function checkData() {
  let allRequestObjects =  await getAllRequestObjects();
  for (let requestObject of allRequestObjects) {
      console.log("sw id",requestObject.id);
      //check time check prio check expiry check dirty
      queue.unshift(requestObject);
    }
    let res = await replayFetch();
    console.log("checkData",res);

    return res;
}


async function replayFetch() {
  var requestObject;
  while(requestObject = await getRequest()){
    console.log("while");
    let request = new Request(requestObject.request.url, requestObject.request);
    var req = request.clone();
    try { 
        await delay(5000);
        
        if(requestObject.operation === "upload") {
          var res = await fetch(req);
          console.log("upload", res);
          let clonedRes = res.clone();

          if (res && res.ok) {
            await sendMessage({ upload: true});
            await removeRequestObject(requestObject.id);         
            let data = await clonedRes.json();    
            console.log("res ok");
            let mongoID = data._id;
            let keyPath = data.id;
            console.log(data._id);
            await addMongoID(mongoID, keyPath);
        }
        else {
          console.log("unshift")
          queue.unshift(requestObject);
          //register push or sync event
        }
         }
        if(requestObject.operation === "remove") {
          const mongoID = await getMongoID();
          //hier eigene Funktion "safeRequest"
          var res = await fetch(req);
          console.log(" remove", res);
          if(res && res.ok) {
            await sendMessage({ upload: true});
            await removeRequestObject(requestObject.id); 
          }
          else {
            console.log("unshift")
            queue.unshift(requestObject);
            await addIdToRemove(mongoID);
            //register push or sync event
          }
        }
    }
      catch (err) {
        console.error(err);
      }
    }
    return res;
      
  }
        
  
async function main() 
{
  try {
    await sendMessage({ requestStatusUpdate: true});
  } 
  catch (err) {
    console.error(err)
  }  
}


async function sendMessage(msg) {
	var allClients =  await clients.matchAll({ includeUncontrolled: true});  // Liste aller Clients
	return Promise.all(
		allClients.map(function clientMsg(client){
			var channel = new MessageChannel();   			//neuer Messagechannel für jeden Client
			channel.port1.onmessage = onMessage; 			//auf Statusupdates auf aktuellen Message Channel lauschen
			return client.postMessage(msg,[channel.port2]); // Statusanfrage senden

		})
	);
}


function onMessage({ data }) {
	if (data.statusUpdate) {
		({ isOnline, isLoggedIn } = data.statusUpdate);
		console.log(`Service Worker (v${version}) status update, isOnline: ${isOnline}, isLoggedIn${isLoggedIn}`);
    
	}
}


function onSync(evt) {
  console.log("onSync")
  console.log(evt)
  if(evt.tag === "toSend") {
    console.log("tag")
    evt.waitUntil(uploadData());
  }
}

async function onInstall(evt) {
	console.log(`Service Worker (${version}) installed... `);
	self.skipWaiting();
}

function onActivate(evt) {
	evt.waitUntil(handleActivation()); 

}

async function handleActivation() {
	await clients.claim();    		//nutze neuen SW direkt und nicht bis zum nächsten laden der Seite
	console.log(`Service Worker (${version}) activated... `);
}


function notFoundResponse() {
	return new Response("",{
			status: 404,
			statusText: "Not Found"
		});
}


function delay(ms) {
	return new Promise((res) =>{
		setTimeout(res,ms);
	});
}