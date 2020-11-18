//für laden von neuem Cache
var version = 3;
var isOnline = true;
var isLoggedIn = false;
var cacheName = `AppShell`;

var urlsToCache = [
  "/index.html",
  "/manifest.json",
  "serviceWorker.js",
  "/asset-manifest.json",
  "/robots.txt",
  "/icons/android-chrome-192x192.png",
  "/icons/android-chrome-512x512.png",
  "/icons/apple-touch-icon.png",
  "/icons/favicon-16x16.png",
  "/icons/favicon-32x32.png",
  "/icons/favicon.ico",
  "/icons/logo192.png",
  "/icons/logo512.png",
  "/static/css/main.e58f2272.chunk.css",
  "/static/css/main.e58f2272.chunk.css.map",
  "/static/js/2.d07223fd.chunk.js",
  "/static/js/2.d07223fd.chunk.js.map",
  "/static/js/main.cff4c997.chunk.js",
  "static/js/main.cff4c997.chunk.js.map",
  "/static/js/runtime-main.4f4bbab1.js",
  "/static/js/runtime-main.4f4bbab1.js.map",
  "/static/media/offline.e95fcf01.png"
]






self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);
self.addEventListener("message", onMessage);



main();

async function main() {
  try {
    await sendMessage({ requestStatusUpdate: true });
    //await cacheAppShell();
  }
    catch(err) {
      console.error(err);
    }
}

async function onInstall(evt) {
  console.log(`ServiceWorker (${version}) installed...`);
  evt.waitUntil(addToCache());
  self.skipWaiting();
}

 async function addToCache() {
   try {
     const cache = await caches.open(cacheName);
     return await cache.addAll(urlsToCache);
   }
   catch(err) {
     console.error(err);
   }

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
  //await cacheAppShell(/*forceReload=*/true);
  console.log(`ServiceWorker (${version}) activated..`);
}

async function cacheIt(forceReload = false) {
  var cache = await caches.match(cacheName);

  return Promise.all(
    urlsToCache.loggedOut.map(async function requestFile(url){
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
  )
}
