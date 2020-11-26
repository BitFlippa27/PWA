import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import Homepage from "./components/Homepage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Data from "./components/data/Data";
import PrivateRoute from "./components/routes/PrivateRoute";
import { loadUser, loadUserOffline } from "./actions/auth";
//import { loadLocalData } from "./actions/data";

//Redux
import { Provider } from "react-redux"; //connects React to Redux
import store from "./store";



if(navigator.onLine === true) {
  if (localStorage.token) {
    store.dispatch(loadUser());
  }
}
if(navigator.onLine === false) {
  if (localStorage.token) {
    store.dispatch(loadUserOffline());
  } 
}


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
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/data" component={Data} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
//TODO: Techdebt: {Input Validation Submit inserted data, Offline Authentifikation(pubKey), Wenn DB leer login failed,Zellen als Input, state mit immutable.js, Data Component lädt zu oft ,Offlineicon,responsiveness, scrollbar, pagination, Isolation(Clean Code, JSLINT)}
