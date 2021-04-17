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


main();


setCacheNameDetails({
  prefix: 'goodSync',
  precache: 'precache',
  runtime: "runtimeCache"
});

precacheAndRoute(self.__WB_MANIFEST);



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