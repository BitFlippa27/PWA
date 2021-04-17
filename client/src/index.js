import ReactDOM from 'react-dom';
import './index.css';
import store from "./store";
import { setAlert } from './actions/alert';
import AppContainer from "./AppContainer";


var isOnline = ("onLine" in navigator) ? navigator.onLine : true;
var isLoggedIn = ("token" in localStorage) ? true : false;  
var swRegistration;
var svworker;
var usingSW = ("serviceWorker" in navigator);



ReactDOM.render(<AppContainer/>,document.getElementById('root'));



if (usingSW) {
  initServiceWorker().catch(console.error);
}

window.addEventListener("online", function online(){
  isOnline = true;
  sendStatusUpdate(); //ohne Parameter, nimmt also automatisch aktiven SW
  store.dispatch(setAlert("Sie sind wieder Online !", "success"));
});

window.addEventListener("offline", function offline() {
  isOnline = false;
  sendStatusUpdate();
  store.dispatch(setAlert("Sie sind Offline !", "danger"));
});

function isSiteOnline() {
  return isOnline;
}


async function initServiceWorker() {
  swRegistration = await navigator.serviceWorker.register("./service-worker.js",{
    updateViaCache: "none" //wir wollen caching selber kontrollieren
  });
  // 3 Statuse
  svworker = swRegistration.installing || swRegistration.waiting || swRegistration.active;
  sendStatusUpdate(svworker);
  //Wenn Statusänderung, Benachrichtigung dass neuer aktiver Service Worker jetzt die Webseite kontrolliert
  navigator.serviceWorker.addEventListener("controllerchange", function onController(){
    svworker = navigator.serviceWorker.controller;   
        if (navigator.serviceWorker) {
          navigator.serviceWorker.register('./service-worker.js')
          .then( function (registration) {
          console.log('Success!', registration.scope);
          })
          .catch( function (error) {
          console.error('Failure!', error);
          });
        }

    sendStatusUpdate(svworker);
  });
  //auf SW Nachrichten hören
  navigator.serviceWorker.addEventListener("message", onSWMessage);
}


function onSWMessage(evt) {
  var { data } = evt;
  if (data.requestStatusUpdate) {
    console.log(`Received status update request from service worker, responding...`);
     //SW kommuniziert mit mehreren Seiten/Tabs somit Nachrichten an einen Message channel mit Ports wo SW lauscht
    sendStatusUpdate(evt.ports && evt.ports[0]);
  }
  if (data.upload === true) {
    store.dispatch(setAlert("Server wieder online ! Daten hochgeladen !", "success"));
  }
  else if(data.upload === false){
    store.dispatch(setAlert("Sie sind offline ", "danger"));
    store.dispatch(setAlert("Sobald Sie wieder Online sind, wird Datensatz hochgeladen", "danger"));
  }
}


function sendStatusUpdate(target) {
  const token = localStorage.getItem("token");
  sendSWMessage({statusUpdate: { isOnline, isLoggedIn }}, target);
}


async function sendSWMessage(msg, target) {
  if (target) {
    target.postMessage(msg);
  }
  else if (svworker) {
    svworker.postMessage(msg);
  }
  else {
    navigator.serviceWorker.controller.postMessage(msg);
  }
}



