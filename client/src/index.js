import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

var isOnline = ("onLine" in navigator) ? navigator.onLine : true;
var isLoggedIn = false;
var swRegistration;
var svWorker;
var swExists = ("serviceWorker" in navigator);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


if(swExists) {
  initServiceWorker();
}

if(!isOnline) {
  //offlineIcon.remove()
}


  window.addEventListener("online", function online() {
    //offlineIcon.remove();
    console.log("online");
    isOnline = true;
    sendStatusUpdate();
  });

  window.addEventListener("offline", function offline() {
    //offlineIcon.add();
    console.log("offline");
    isOnline = false;
    sendStatusUpdate(); //kein Argument -> nimm automatisch aktuellen SW
  });


async function initServiceWorker() {
  try {
    swRegistration = await navigator.serviceWorker.register("serviceWorker.js", {
      updateViaCache: "none"
    });
    svWorker = swRegistration.installing || swRegistration.waiting || swRegistration.active;

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      svWorker = navigator.serviceWorker.controller;
      sendStatusUpdate(svWorker);
    }); // neuer SW hat übernommen

    navigator.serviceWorker.addEventListener("message", onSWMessage);
  }
  catch(err) {
    console.error(err);
  }
}

// SW hat kein offline,online Event und kein Zugriff auf Cookies deswegen soll App uns informieren
function onSWMessage(evt) {
  var { data } = evt;
  if(data.requestStatusUpdate) {
    console.log("Statusupdate request from SW received");
    sendStatusUpdate(evt.ports && evt.ports[0]); //SW lauscht auf diesen MessageChannelPort
  }
}

function sendStatusUpdate(target) {
  sendSWMessage({statusUpdate: { isOnline, isLoggedIn }}, target);
}

function sendSWMessage(msg, target) {
  if(target) {
    target.postMessage(msg);
  }
  else if (svWorker) {
    svWorker.postMessage(msg);
  }
  else {
    navigator.serviceWorker.controller.postMessage(msg);
  }
}
