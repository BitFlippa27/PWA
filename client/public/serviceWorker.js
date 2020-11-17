//für laden von neuem Cache
var version = 4;
var isOnline = true;
var isLoggedIn = false;
var cacheName = `GoodSync-${version}`;

var urlsToCache = {
  loggedOut: [

  ]
}

self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);
self.addEventListener("message", onMessage);


main();

async function main() {
  try {
    await sendMessage({ requestStatusUpdate: true });
  }
    catch(err) {
      console.error(err);
    }
}

async function onInstall(evt) {
  console.log(`ServiceWorker (${version}) installed...`);
  self.skipWaiting(); // neuer SW übernimmt sofort
}

//Statusanfrage an alle Clients
async function sendMessage(msg) {
	var allClients =  await clients.matchAll({ includeUncontrolled: true});  // Liste aller Clients
	return Promise.all(
		allClients.map(function clientMsg(client){
			var channel = new MessageChannel();   		         //neuer Messagechannel für jeden Client
			channel.port1.onmessage = onMessage; 			        //auf Statusupdates auf aktuellen Message Channel lauschen
			return client.postMessage(msg,[channel.port2]); // Statusanfrage senden
		})
	);
}

function onMessage({ data }) {
  if(data.statusUpdate) {
    ({ isOnline, isLoggedIn } = data.statusUpdate);
    console.log(`ServiceWorker (v${version}) status update... isOnline: ${isOnline}, isLoggedIn: ${isLoggedIn}`);
  }
}
function onActivate(evt) {
  //beende SW erst wenn kompletter Cache geladen
  evt.waitUntil(handleActivation());
}

async function handleActivation() {
  //nutze neuen SW direkt und nicht bis zum nächsten laden der Seite
  await clients.claim();
  console.log(`ServiceWorker (${version}) activated..`);
}
