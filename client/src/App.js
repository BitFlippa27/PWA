import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Homepage from "./components/Homepage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
//Redux
import { Provider } from "react-redux";  //connects React to Redux
import store from "./store";

const App = () => {
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
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}



export default App;
