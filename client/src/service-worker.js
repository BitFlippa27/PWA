// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.
//importScripts("dexie.js");
import { setCacheNameDetails } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies';
import {  getRequest, removeRequest, getAllRequests, getMongoID } from './dexie';
import { pushRequest } from "./queue";


const version = 8;
var isLoggedIn = false;
var isOnline = true;
var token;


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
  "http://localhost:5555/api/zips", 
  dataUploadHandler, "POST"
);

registerRoute(
  /http:\/\/localhost:5555\/api\/zips\/.*/, 
  dataRemoveHandler, "DELETE"
);


async function dataUploadHandler({ request }) {
  try {
    var req = request.clone();
    const res = await fetch(request);  
    //console.log("plain", request);

    return res;
    
  }
  catch(err) {
    await sendMessage({ upload: false});
    const id = await pushRequest(req);
    await uploadData(id);
    
   
  }
}

async function dataRemoveHandler({ request }) {
  try {
    const res = await fetch(request);  
    
    return res;
  }
  catch(err) {
    await sendMessage({ upload: false});
    await removeData(request);
  }
}


async function uploadData(id) {
  var needToFetch = true;
  const requests = await getAllRequests();
  //todo loop every request and check role and time


  const requestObject = requests[0].request;
  
  const request = new Request(requestObject.url, requestObject)
  const req = await request.clone();



  console.log("object", requests[0]);
  console.log("reqData", requests[0].request);
  
  
  /*
  const postBody = JSON.stringify(request);
  token = request.headers.get("X-Auth-Token");

  const fetchOptions = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers:{
      "Content-Type" : "application/json",
      "X-Auth-Token" : `${token}`
    }, 
    credentials: "omit",
    body: `${postBody}`
  }
  */
  if(needToFetch) {
    await delay(5000);
      try {
        
        const res = await fetch(req);
        
        if (res && res.ok) {
          needToFetch = false;
          await sendMessage({ upload: true});
          console.log("sw", id);
          await removeRequest(id);

          return res;
        }
      }
      catch (err) {
        console.error(err);
        return uploadData();
      }
      if (needToFetch) {
        return uploadData();
      }
  } 
}


async function removeData(req) {
  var needToFetch = true;
  token = req.headers.get("X-Auth-Token");
  const mongoID = await getMongoID();
 
  const fetchOptions = {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    headers:{
      "Content-Type" : "application/json",
      "X-Auth-Token" : `${token}`
    }, 
    credentials: "omit"
  }
  //hier eigene Funktion "safeRequest"
  if(needToFetch) {
    await delay(5000);
      try {
        
        const res = await fetch(`http://localhost:5555/api/zips/${mongoID}`, fetchOptions );
        
        if (res && res.ok) {
          needToFetch = false;
          await sendMessage({ upload: true});

          return res;
        }
      }
      catch (err) {
        console.error(err);
        return removeData(req);
      }
      if (needToFetch) {
        return removeData(req);
      }
  } 
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