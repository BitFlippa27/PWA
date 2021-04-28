import { from, HttpLink, createHttpLink, ApolloLink } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import QueueLink from 'apollo-link-queue';
import SerializingLink from 'apollo-link-serialize';
import { InMemoryCache, ApolloClient } from "@apollo/client";
import { asyncMap } from "@apollo/client/utilities";
import localforage from "localforage";
import { CachePersistor, LocalForageWrapper } from 'apollo3-cache-persist';
import { addQuery, localForageStore } from "./localForage";

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

  const errorLink = onError(({graphQLErrors, networkError, operation, forward}) => {
    if (graphQLErrors){
      graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
    }
    
    if (networkError){
      console.log(`[Network error]: ${networkError}`);
    }
      

    return forward(operation);
  });
  
  const queueLink = new QueueLink();
  
  window.addEventListener('offline', () => queueLink.close())
  window.addEventListener('online', () => queueLink.open())
  
  const serializingLink = new SerializingLink();
  
  const trackerLink = new ApolloLink((operation, forward) => {
    if (forward === undefined) return null
    console.log("operation", operation)
    const context = operation.getContext();
    console.log("context", context)
    const { optimisticResponse } = context;
    console.log("optimisticResponse", optimisticResponse)
   
    if (context.tracked) {
      var { operationName, query, variables } = operation
      
      var newTrackedQuery = {
        query,
        variables,
        context,
        operationName,
      }
      console.log(newTrackedQuery)
      addQuery(newTrackedQuery);
    }

    return asyncMap(forward(operation),async (response) => {
     
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


