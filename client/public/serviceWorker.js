//für laden von neuem Cache
var version = 2;
var isOnline = true;
var isLoggedIn = false;

self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);

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

async function sendMessage(msg) {
  var allClients = await clients.matchAll({ includeUncontrolled: true });
  return Promise.all(
    allClients.map(function clientMsg(client) {
      var chan = new MessageChannel(); //neue Kanal für jeden client
      chan.port1.onmessage = onMessage;
      return client.postMessage(msg, [chan.port2]); //lauschen auf Port1, senden auf 2 
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
  evt.waitUntil(handleActivation()); //beende SW erst wenn kompletter Cache geladen
}

async function handleActivation() {
  await clients.claim();
  console.log(`ServiceWorker (${version}) activated..`);
}
