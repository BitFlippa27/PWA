import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, ApolloLink } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from 'apollo-link-context';
import { CachePersistor, LocalForageWrapper } from 'apollo3-cache-persist';
import localForage from "localforage";


export const getApolloClient = async () => {
  const cache = new InMemoryCache();

    const cachePersistor = new CachePersistor({
    cache,
    storage: new LocalForageWrapper(localForage),
    trigger: "write",
    maxSize: false,
    debug: true
  });

 
  async function persistCache(){
    try {
      await cachePersistor.restore();  
    } 
    catch (err) {
      console.error(err); 
    }
  }
  persistCache();

  const httpLink = createHttpLink({
    uri: "http://localhost:5555"
  });

  const retryLink = new RetryLink({
    delay: {
      initial: 300,
      max: 1000,
      jitter: false,
    },
    attempts: {
      max: 1,

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

  const client = new ApolloClient({
  cache,
  //retryLink,
  link: authLink.concat(httpLink),
  assumeImmutableResults: true
});

  const delay = setContext(
    request =>
      new Promise((success, fail) => {
        setTimeout(() => {
          success()
        }, 10000)
      })
  )

  const delayLink = ApolloLink.from([
    delay
  ])

  return client;
}



