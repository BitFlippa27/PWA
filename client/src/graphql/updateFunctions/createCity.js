import { FETCH_CITIES_QUERY } from "../../graphql/queries";

const createCity = (cache, { data: { createCity }}) => {
    const data = cache.readQuery({query: FETCH_CITIES_QUERY});
    const updatedArray = [...data.getAllCities, createCity];
    const newData = {...data, getAllCities: updatedArray};
    cache.writeQuery({
      query: FETCH_CITIES_QUERY,
      data: newData
    });
   
    
  }

  export default createCity;