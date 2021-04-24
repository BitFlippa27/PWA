import { from, HttpLink, createHttpLink, ApolloLink } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import QueueLink from 'apollo-link-queue';
import SerializingLink from 'apollo-link-serialize';
import { InMemoryCache, ApolloClient } from "@apollo/client";
import auth from "./reducers/auth";
import localforage from "localforage";
import { CachePersistor, LocalForageWrapper } from 'apollo3-cache-persist';
import { getQueries, addQuery, clearQueries, localForageStore } from "./localForage";


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
    console.log("trackerLink")
    const context = operation.getContext();
    const trackedQueries = JSON.parse(window.localStorage.getItem('trackedQueries') || null) || []
    if (context.tracked) {
      var { operationName, query, variables } = operation
      
      
      var newTrackedQuery = {
        query,
        context,
        variables,
        operationName,
      }
      const trackedQueriesCopy = [...trackedQueries, newTrackedQuery];
      window.localStorage.setItem('trackedQueries', JSON.stringify(trackedQueriesCopy));
    }

  
    return forward(operation).map((data) => {
      if (context.tracked) {
        window.localStorage.setItem('trackedQueries', JSON.stringify(trackedQueries))
      }
      return data;
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


