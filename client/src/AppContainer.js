import App  from "./App";
import { getApolloClient } from  "./ApolloProvider";
import { useEffect, useState } from "react";
import Loader from "./components/Loader"

const AppContainer = () => {
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const client = getApolloClient();
    setClient(client)
    setLoading(false)
  }, [])
  
  if(client === null)
    return  <Loader/>
  
  
  return <App client={client} loading={loading} /> 
}
export default AppContainer;