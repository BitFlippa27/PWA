import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, ApolloLink } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from 'apollo-link-context';
import { CachePersistor, LocalForageWrapper } from 'apollo3-cache-persist';
import localForage from "localforage";



const cache = new InMemoryCache();

export const cachePersistor = new CachePersistor({
  cache,
  storage: new LocalForageWrapper(localForage),
  trigger: "write",
  maxSize: false,
  debug: true
});

export async function restoreCache(){
  try {
    console.log(cachePersistor)
    await cachePersistor.restore(); 

    return true;
  } 
  catch (err) {
    console.error(err)
  }
} 

restoreCache();

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



export const client = new ApolloClient({
  cache,
  retryLink,
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



export default (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)