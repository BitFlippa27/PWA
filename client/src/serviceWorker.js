const version = 2;

self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);
self.addEventListener("message", onMessage);


main();

async function main() {
  try {
    await await sendMessage({ requestStatusUpdate: true});
  }
  catch(err) {
    console.error(err);
  }
}

//Statuanfrage an alle Clients
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
	evt.waitUntil(handleActivation()); 	//Browser informieren noch nicht alle Prozesse zu beenden bis alles gecached ist

}
//neuer SW
//Wenn neuer SW registriert ist, wird dieser nicht benutzt bis zum nächsten laden der Seite
async function handleActivation() {			
	await clients.claim();    		//nutze neuen SW direkt und nicht bis zum nächsten laden der Seite
	console.log(`Service Worker (${version}) activated... `);
}
