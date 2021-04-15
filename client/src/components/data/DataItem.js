import React, { Fragment, useState } from "react";
import { UPDATE_CITY_MUTATION, FETCH_CITIES_QUERY, DELETE_CITY_MUTATION } from "../../graphql/queries";
import { useMutation } from "@apollo/client";


const DataItem = ({ row: {id, _id, city, zip, pop } }) => {
  const [formData, setFormData] = useState({
    updatedCity: "",
    updatedPop: "",
  });

  const { updatedCity, updatedPop } = formData; 

  const [ID, setID] = useState("");


  const [editCity, newCity] = useMutation(UPDATE_CITY_MUTATION, {
    update(cache, {data: { updateCity }}){
      console.log("updateCity server response",updateCity)
      const data = cache.readQuery({query: FETCH_CITIES_QUERY});
      console.log("data after readQuery",data)

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

      
      
    
    },
    onError(error){
      console.log(error)
      
    }
  
  });
  //console.log("newCity", newCity);
  

  const [removeCity, removedCity] = useMutation(DELETE_CITY_MUTATION, {
    update(cache, {data: { deleteCity }}){
      const data = cache.readQuery({ query: FETCH_CITIES_QUERY });

      cache.writeQuery({
        query: FETCH_CITIES_QUERY,
        data: { getAllCities: data.getAllCities.filter(element => element.id !== deleteCity.id)}
      });
    },
    onError(error){
      console.log(error)
      
    }
  });

  //console.log("removedCity", removedCity);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
    

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData) 
      return;
    
    
    const { updatedCity, updatedPop } = formData;
    

    editCity({
      variables: { id, city: updatedCity, pop: updatedPop },
      optimisticResponse: {
        __typename: "Mutation",
        updateCity: {
          __typename: "City",
          id: ID,
          city: updatedCity,
          pop: updatedPop,
        }
      }
    });
    setID("");
    
  }


  const clickEdit = (id) => {
    setID(id);
  }

  const clickRemove = (id) => {
    removeCity({
      variables:  {id}
    });
  }
  
  if(ID === ""){
    return (
      <Fragment>
        <tr >
          <th  scope="col">
            {city}
          </th>
          <th  scope="col">{pop}</th>
          <th scope="col">
            <button className="actions" onClick={ () => clickEdit(id)}  >
              <i className="fas fa-pencil-alt" />{" "}
            </button>
            <button className="actions" onClick={() => clickRemove(id)} >
              {/*<i>{console.log(id)}</i>*/}
              <i className="fas fa-minus-circle"/>{" "}
            </button>
          </th>
        </tr>
      </Fragment>
    );
  }

  return (
    <tr>
      <th className="data-input2">
        <form className="form ">
          <input
            className="form-control"
            type="text"
            name="updatedCity"
            placeholder={city}
            value={updatedCity}
            onChange={(e) => onChange(e)}
            required
          ></input>
        </form>
      </th>
      <th className="data-input2">
        <form className="form ">
          <input
            className="form-control"
            type="number"
            name="updatedPop"
            placeholder={pop}
            value={updatedPop}
            onChange={(e) => onChange(e)}
            required
          ></input>
            </form>
      </th>

    <th>
      <form className="form " onSubmit={(e) => onSubmit(e)}>
        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
    </th>
   </tr>
  ) 
}
  


export default DataItem;