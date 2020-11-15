import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
/*
if("serviceWorker" in  navigator){
  initServiceWorker();
}
async function initServiceWorker() {
    try {
      var reg = await navigator.serviceWorker.register("/sw.js", {
        updateViaCache: "none"
      });
      console.log("Registriert!")
    }
    catch(err) {
      console.error(err);

    }

  }
*/
if("serviceWorker" in navigator) {
  initServiceWorker();
}
async function initServiceWorker() {
  try {
    await navigator.serviceWorker.register("serviceWorker.js");
    console.log("registriert!!!")
  }
  catch(err) {
    console.error(err);
  }
}
