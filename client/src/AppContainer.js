/*import App  from "./App";
import { getApolloClient } from  "./ApolloProvider";
import { useEffect, useState } from "react";
import Loader from "./components/Loader"

const AppContainer = () => {
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
    console.log("after getApolloClient")
    const client =  getApolloClient();
    console.log("after getApolloClient")
    setClient(client)
    console.log(client)
    setLoading(false)
    } catch (error) {
      
    }
    
  }, [])
  
  if(loading === null){
    console.log("AppContainer loading")
    return  <Loader/>
  }
    
  
  
  return <App client={client} loading={loading} /> 
}
export default AppContainer;
*/