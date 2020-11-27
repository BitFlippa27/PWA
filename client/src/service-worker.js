// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim, setCacheNameDetails } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

const version = 8;
var isLoggedIn = false;
var isOnline = true;
var cacheName = "tmpCache";

self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);
self.addEventListener("message", onMessage);


main().catch(console.error);

setCacheNameDetails({
  prefix: 'goodSync',
  suffix: 'v1',
  precache: 'appShellPrecache'
});


async function main() {
	await sendMessage({ requestStatusUpdate: true});
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




//clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
/*registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    } // If this is a URL that starts with /_, skip.

    if (url.pathname.startsWith('/_')) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.

    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);
*/


// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.jpg'), // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

const apiAuth = ({url, request, event}) => {
  return (url.origin === "http://localhost:5000/data");
}
const authHandler = async ({url, event, request}) => {
  if(isOnline === false) {
    if (isLoggedIn === false) {
      return new Response.redirect("http://localhost:5000/login",307);
    }
  }
  if(isOnline === true) {
    if (isLoggedIn === false) {
      return new Response.redirect("http://localhost:5000/login",307);
    }
  }
}
registerRoute(/.*(?:googleapis|bootstrap|fontawesome)\.com.*$/, new StaleWhileRevalidate({cacheName: "3rdParty"}));
//registerRoute(apiAuth, authHandler);


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
  //await clearCaches(); // wenn neuer SW in Kontrolle, alten cache leeren
	evt.waitUntil(handleActivation()); 			//Browser informieren noch nicht alle Prozesse zu beenden bis alles gecached ist

}

async function handleActivation() {
	await clients.claim();    		//nutze neuen SW direkt und nicht bis zum nächsten laden der Seite
	console.log(`Service Worker (${version}) activated... `);
}


// Any other custom service worker logic can go here.
