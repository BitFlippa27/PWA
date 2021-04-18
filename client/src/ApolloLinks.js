import { createHttpLink, ApolloLink } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from 'apollo-link-context';



  export const httpLink = createHttpLink({
    uri: "http://localhost:5555"
  });


  export const authLink = setContext(() => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    };
  });


  export const retryLink = new RetryLink({
    delay: {
      initial: 300,
      max: 1000,
      jitter: false,
    },
    attempts: {
      max: 3,

    }
  })

  const delay = setContext(
    request =>
      new Promise((success, fail) => {
        setTimeout(() => {
          success()
        }, 10000)
      })
  )

  export const delayLink = ApolloLink.from([
    delay
  ])

