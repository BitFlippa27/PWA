import { HttpLink, createHttpLink, ApolloLink } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import QueueLink from 'apollo-link-queue';
import SerializingLink from 'apollo-link-serialize';



  const httpLink = new HttpLink({
    uri: "http://localhost:5555"
  });


  const retryLink = new RetryLink({
    attempts: {
      max: Infinity,
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


   
  const delay = setContext(
    request =>
      new Promise((success, fail) => {
        setTimeout(() => {
          success()
        }, 10000)
      })
  )

  const errorLink = onError(({ networkError }) => {
    if (networkError && networkError.statusCode === 401) {
      localStorage.removeItem("token");
      window.location.replace('/login')
    }
  });

  const queueLink = new QueueLink();

  window.addEventListener('offline', () => queueLink.close())
  window.addEventListener('online', () => queueLink.open())

  const serializingLink = new SerializingLink();

  const trackerLink = new ApolloLink((operation, forward) => {
    if (forward === undefined) return null

    const context = operation.getContext()
    const trackedQueries = JSON.parse(window.localStorage.getItem('trackedQueries') || null) || []

    if (context.tracked) {
      const { operationName, query, variables } = operation
      console.log("OperatioName",operationName)

      const newTrackedQuery = {
        query,
        context,
        variables,
        operationName,
      }

      window.localStorage.setItem('trackedQueries', JSON.stringify([...trackedQueries, newTrackedQuery]))
    }

    return forward(operation).map((data) => {
      if (context.tracked) {
        window.localStorage.setItem('trackedQueries', JSON.stringify(trackedQueries))
      }

      return data;
    });
  });

  export const links = ApolloLink.from([
    trackerLink,
    queueLink,
    serializingLink,
    retryLink,
    errorLink,
    authLink,
    httpLink
  ]);