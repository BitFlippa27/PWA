import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Homepage from "./components/Homepage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import { loadUser } from "./actions/auth";  
import setToken from "./utils/setToken";
//Redux
import { Provider } from "react-redux";  //connects React to Redux
import store from "./store";


if(localStorage.token) {
  
  setToken(localStorage.token);   //every time app gets loaded
  store.dispatch(loadUser());
}

const App = () => {
  console.log("geladen")
    //[] makes it run just once, so effect doesnt depend on any props or state
  return(
    
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
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}



export default App;
