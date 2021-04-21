import { from, HttpLink, createHttpLink, ApolloLink } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import QueueLink from 'apollo-link-queue';
import SerializingLink from 'apollo-link-serialize';
import { InMemoryCache, ApolloClient } from "@apollo/client";
import auth from "./reducers/auth";
import localforage from "localforage";


export const localForageStore = localforage.createInstance({name: "queue"});
async function testLocalForage(){
  const array1 = [1,2,3];
  await localForageStore.setItem("trackedQueries",array1);
  await localForageStore.setItem("trackedQueries", [...array1, 27]);
  const result = await localForageStore.getItem("trackedQueries");
  console.log(result);
}

testLocalForage();




export const cache = new InMemoryCache()


export const httpLink = new HttpLink({
uri: "http://localhost:5555"
});


export const retryLink = new RetryLink({
attempts: {
  max: Infinity
}
})

export const authLink = setContext(() => {
const token = localStorage.getItem('token');
return {
  headers: {
    Authorization: token ? `Bearer ${token}` : ''
  }
};
});



const delay = setContext(
request =>
  new Promise((success, fail) => {
    setTimeout(() => {
      success()
    }, 10000)
  })
)

export const errorLink = onError(({graphQLErrors, networkError, operation, forward }) => {
  if (networkError && networkError.statusCode === 401) {
    console.log(`NetworkError: ${networkError}`)
    localStorage.removeItem("token");
    window.location.replace('/login')
    
  }
  if (graphQLErrors){
    graphQLErrors.forEach(({message, locations, path})=>
    console.log(`Message:${message} Location: ${locations} Path: ${path}` ) 
    );
  }


});

export const queueLink = new QueueLink();

window.addEventListener('offline', () => queueLink.close())
window.addEventListener('online', () => queueLink.open())

export const serializingLink = new SerializingLink();

export const trackerLink = new ApolloLink((operation, forward) => {
  if (forward === undefined) return null

  const context = operation.getContext()
  const trackedQueries = localForageStore.getItem('trackedQueries') || null || []

  if (context.tracked) {
    const { operationName, query, variables } = operation
    console.log("OperatioName",operationName)

    const newTrackedQuery = {
      query,
      context,
      variables,
      operationName,
    }

    localForageStore.setItem('trackedQueries', JSON.stringify([...trackedQueries, newTrackedQuery]))
  }

  return forward(operation).map((data) => {
    if (context.tracked) {
      localForageStore.setItem('trackedQueries', JSON.stringify(trackedQueries))
    }

    return data;
  });
  });

export const links = from([
  trackerLink,
  queueLink,
  serializingLink,
  retryLink,
  errorLink
]);

