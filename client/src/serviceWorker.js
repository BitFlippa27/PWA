//für laden von neuem Cache
var version = 3;
var isOnline = true;
var isLoggedIn = false;
var cacheName = `AppShell`;

var urlsToCache = [
  "/src/App.js"
];

self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);
self.addEventListener("message", onMessage);

main();

async function main() {
  try {
    await sendMessage({ requestStatusUpdate: true });
    await cacheAppShell();
  }
  catch(err) {
    console.error(err);
  }
}

async function onInstall(evt) {
  console.log(`ServiceWorker (${version}) installed...`);
  evt.waitUntil(cacheAppShell(true));
  self.skipWaiting();
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
    console.log(`ServiceWorker (v${cacheName}) status update... isOnline: ${isOnline}, isLoggedIn: ${isLoggedIn}`);
  }
}
function onActivate(evt) {
  //beende SW erst wenn kompletter Cache geladen
  evt.waitUntil(handleActivation());
}

async function handleActivation() {
  //nutze neuen SW direkt und nicht bis zum nächsten laden der Seite
  await clients.claim();
  //await cacheAppShell(/*forceReload=*/true);
  console.log(`ServiceWorker (${version}) activated..`);
}

async function cacheAppShell(forceReload = false) {
  var cache = await caches.open(cacheName);

  return Promise.all(
    urlsToCache.map(async function requestFile(url){
      try {
        let res;

        if(!forceReload) {
          res = await cache.match(url);
          if(res) {
            return res;
          }
        }

        let fetchOptions = {
          method: "GET",
          cache: "no-cache", //eigene Kontrolle über caching
          credentials: "omit"
        };
        res = await fetch(url, fetchOptions);
        if(res.ok) {
          await cache.put(url, res);
        }
      }
      catch(err) {
        console.error(err);
      }
    })
  );
}
