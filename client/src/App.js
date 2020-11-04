//TODO: responsive design
import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Homepage from "./components/Homepage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Data from "./components/data/Data";
import PrivateRoute from "./components/routes/PrivateRoute";
import { loadUser } from "./actions/auth";
import { loadLocalData } from "./actions/data";
import setToken from "./utils/setToken";
//Redux
import { Provider } from "react-redux";  //connects React to Redux
import store from "./store";


if(localStorage.token) {

  setToken(localStorage.token);   //every time app gets loaded
  store.dispatch(loadUser());
  console.log("loadLocalData")
  store.dispatch(loadLocalData());
}


const App = () => {

  console.log("geladen")

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
                <PrivateRoute exact path="/data" component={Data} />
              </Switch>
            </section>
          </Fragment>
        </Router>
      </Provider>

  );
}



export default App;
//TODO: Techdebt: {state mit immutable.js, responsiveness, scrollbar, pagination}
