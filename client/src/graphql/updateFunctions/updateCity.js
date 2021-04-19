import { FETCH_CITIES_QUERY } from "../../graphql/queries";

const updateCity = (cache, {data: { updateCity }}) => {
  const data = cache.readQuery({query: FETCH_CITIES_QUERY});
  cache.writeQuery({
    query: FETCH_CITIES_QUERY,
    data: { getAllCities:  data.getAllCities.map(element => {
      if(element.id === updateCity.id){
        let elementCopy =  {...element};
        elementCopy = updateCity;
        console.log(elementCopy)
        console.log(updateCity)

        return elementCopy;
      }
      else
        return element;
    })}
  });
}
export default updateCity;