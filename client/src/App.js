import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import Homepage from "./components/Homepage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Data from "./components/data/Data";
import Pictures from "./components/Pictures";
import Offline from "./components/auth/Offline";
import { loadUser, loadUserOffline } from "./actions/auth";
import { Provider } from "react-redux"; //connects React to Redux
import store from "./store";
import { useSelector } from "react-redux";
import  { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "./graphql/queries";
import { LOGIN_SUCCESS } from "./actions/types";

const token = localStorage.getItem("token");

if(token)
  store.dispatch(loadUser());


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Homepage} />
          <Navbar />
          <section className="container">
          <Alert />
            <Switch>
              <Route exact path="/pictures" component={Pictures} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/offline" component={Offline} />
              <Route exact path="/data" component={Data} />
            </Switch>
            </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;




/*Techdebt = {
  Sie sind wieder online offline  bei  schlechter Verbindung zu oft angezeigt
    catchHandler, defaulthandler -> offline Page dann LoginPage
    Offline Anmeldung
    wenn auf Button clear Table und dann neuladen der Table => stale
    wenn Table nicht geladen werden kann -> Refresh Aufforderung
    leerer Datensatz submit, 
    Offline Authentifikation(pubKey),
    Wenn DB leer login failed,
    Zellen als Input, 
    state mit immutable.js, 
    Data Component lädt zu oft ,
    Offlineicon,
    responsiveness, 
    scrollbar, 
    pagination, 
    Isolation(Clean Code, JSLINT),
    dexie queue mit ids,

    Alle console.error() raus, eigene Error pop ups,
    Teamfinder === clearErrors, setPostLoading
    Dataupload Nachricht nicht in SW sondern in action dispatch
    
}
*/