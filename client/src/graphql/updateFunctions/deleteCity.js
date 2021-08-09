import { FETCH_CITIES_QUERY } from "../../graphql/queries";

const deleteCity = (cache, { data: { deleteCity }}) => {
  const data = cache.readQuery({ query: FETCH_CITIES_QUERY });
  cache.writeQuery({
    query: FETCH_CITIES_QUERY,
    data: { getAllCities: data.getAllCities.filter(element => element.id !== deleteCity.id)}
  });
}

  export default deleteCity;