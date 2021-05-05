import React, { Fragment, useState } from "react";
import { UPDATE_CITY_MUTATION, FETCH_CITIES_QUERY, DELETE_CITY_MUTATION } from "../../graphql/queries";
import { useMutation } from "@apollo/client";
import * as updateFunctions from "../../graphql/updateFunctions";



const DataItem = ({ row: {id, _id, city, zip, pop } }) => {
  const [formData, setFormData] = useState({
    updatedCity: "",
    updatedPop: "",
  });

  const { updatedCity, updatedPop } = formData; 

  const [ID, setID] = useState("");
  


  const [editCity, newCity] = useMutation(UPDATE_CITY_MUTATION);
  const [removeCity, removedCity] = useMutation(DELETE_CITY_MUTATION);

  //console.log("removedCity", removedCity);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
    

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.updatedCity === "" || formData.updatedPop === "") 
      return;
    
    
    const { updatedCity, updatedPop } = formData;
    

    editCity({
      variables:  {id: ID, city: updatedCity, pop: updatedPop },
      update: updateFunctions.updateCity,
      context: {
        tracked: true,
        id: ID,
        serializationKey: "MUTATION"
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateCity: {
          id: ID,
          __typename: "City",
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
    const idToRemove = id;
   
    removeCity({
      variables:  {id: idToRemove},
      update: updateFunctions.deleteCity,
      context: {
        tracked: true,
        id: idToRemove,
        serializationKey: 'MUTATION'
      },
      optimisticResponse: {
        __typename: "Mutation",
        deleteCity: {
          id: idToRemove ,
          __typename: "City",
          city: city
        
        }
      }
      
    });
  }
  
  if(ID === ""){
    return (
      <Fragment>
        <tr key={id} >
          <th  scope="col">
            {city}
          </th>
          <th  scope="col">{pop}</th>
          <th scope="col">
            <a onClick={ () => clickEdit(id)}>
              <i className="fas fa-pencil-alt" />{" "}
            </a>
            <a onClick={() => clickRemove(id)}>
              <i className="fas fa-minus-circle"/>{" "}
            </a>
              {console.log(id)}
         
          </th>
        </tr>
      </Fragment>
    );
  }

  return (
    <tr key={id}>
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