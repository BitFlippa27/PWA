import React, { Fragment, useState, useEffect } from "react";
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
import { loadUser } from "./actions/auth";
import { Provider } from "react-redux"; //connects React to Redux
import store from "./store";
import  { ApolloProvider, getApolloContext, useQuery } from "@apollo/client/react";
import { IS_LOGGED_IN, FETCH_CITIES_QUERY } from "./graphql/queries";
import Loader from "./components/Loader";
import { InMemoryCache, ApolloClient, from } from "@apollo/client";
import { CachePersistor, LocalForageWrapper } from 'apollo3-cache-persist';
import getApolloClient, {localForageStore, cache, authLink, httpLink, links, trackerLink, serializingLink, queueLink, errorLink, retryLink } from "./ApolloLinks";
import * as updateFunctions from "./graphql/updateFunctions";
import { HttpLink, createHttpLink, ApolloLink } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import QueueLink from 'apollo-link-queue';
import SerializingLink from 'apollo-link-serialize';
import localForage from "localforage";



const token = localStorage.getItem("token");

if(token)
  store.dispatch(loadUser());

const App = () => {
  const [client, setClient] = useState();

  useEffect(() => {
    getApolloClient().then((client) => {
      setClient(client);
    })
  }, []);

  
  useEffect(() => {
    if (!client) 
      return

    const execute = async () => {
      const trackedQueries = JSON.parse(window.localStorage.getItem('trackedQueries') || null) || [];
      if (trackedQueries.length !== 0){
        const promises = trackedQueries.map(({ variables, query, context, operationName }) => client.mutate({
          variables,
          mutation: query,
          update: updateFunctions[operationName],
          optimisticResponse: context.optimisticResponse,
        }))
  
        try {
          await Promise.all(promises)
        } catch (err) {
          // A good place to show notification
          console.error(err);
        }
      }
      window.localStorage.setItem('trackedQueries', [])
    }

    execute()
  }, [client]);
  
  if(!client)
    return <Loader/>;

  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
   
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