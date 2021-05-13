import {
    from,
    HttpLink,
    createHttpLink, 
    ApolloLink,
    InMemoryCache,
    ApolloClient,
  } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import QueueLink from 'apollo-link-queue';
import SerializingLink from 'apollo-link-serialize';
import { } from "@apollo/client";
import { asyncMap } from "@apollo/client/utilities";
import localforage from "localforage";
import { CachePersistor, LocalForageWrapper } from 'apollo3-cache-persist';
import { addQuery, removeQuery, checkOfflineRemove, rmOfflineDeleteQuery, lookupTable, updateID } from "./localForage";
import * as updateFunctions from "./graphql/updateFunctions";
import { check } from "express-validator"
import Observable from 'zen-observable';
//import QueueLink from "./QueueLink.ts";


async function getApolloClient(){
  const cache = new InMemoryCache();

  const newPersistor = new CachePersistor({
    cache, 
    storage: new LocalForageWrapper(localforage),
    trigger: "write",
    maxSize: false,
    debug: true
  });

  await newPersistor.restore();

  const httpLink = new HttpLink({
    uri: "http://localhost:5555"
    });
    
  const retryLink = new RetryLink({
    attempts: {
      max: Infinity
    }
    })

  const authLink = setContext(() => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    };
    });

  const errorLink = onError(({graphQLErrors, networkError, response }) => {
    console.log("ErrorLink down")
    if (graphQLErrors){
      graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
    }
    
    if (networkError){
      console.log(`[Network error]: ${networkError}`);
      console.log(response)
    }

  });
  
  const queueLink = new QueueLink();
  
  window.addEventListener('offline', () => queueLink.close())
  window.addEventListener('online', () => queueLink.open())
  

  


  
  
  const serializingLink = new SerializingLink();
  
  const trackerLink = new ApolloLink(async(operation, forward) => {
    if (forward === undefined) return null
    console.log("trackerLink down")
    const context = operation.getContext();
    console.log(context)
    const { optimisticResponse } = context;
   
   
    if (context.tracked) {
      var { operationName, query, variables } = operation
      
      var newTrackedQuery = {
        query,
        variables,
        optimisticResponse,
        operationName,
      }
      console.log(query);
      await addQuery(context.id, newTrackedQuery, operationName);
    }

    
    return asyncMap(forward(operation),async (response) => {
      console.log("response", response)

      if(response && operationName === "CreateCity"){
        await removeQuery(response.data.createCity.optimisticID, operationName);
      }
      
      if(response && operationName === "UpdateCity")
        await removeQuery(response.data.updateCity.id, operationName)
      
      if(response && operationName === "DeleteCity"){
        await removeQuery(response.data.deleteCity.id, operationName);
        console.log("deleteCity remove")
      }
      
      
      return response;
    });
    
    
  });
  
  const links = from([
    trackerLink,
    queueLink,
    serializingLink,
    retryLink,
    errorLink,
    authLink,
    httpLink
    
  ]);

  const client = new ApolloClient({
    link: links,
    cache
  });

  return client;

}

export default getApolloClient;


