import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from 'apollo-link-context';
import { ApolloLink } from "apollo-link";

const httpLink = createHttpLink({
  uri: "http://localhost:5555"
});

const authLink = setContext(() => {
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

const delayLink = ApolloLink.from([
  delay
])


const client = new ApolloClient({
  delayLink,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


export default (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)