import React, { Fragment, useState } from "react";
import { UPDATE_CITY_MUTATION, FETCH_CITIES_QUERY, CREATE_CITY_MUTATION } from "../../graphql/queries";
import { useMutation } from "@apollo/client";


const DataItem = ({ row: {id, _id, city, zip, pop }, removeData }) => {
  const [formData, setFormData] = useState({
    updatedCity: "",
    updatedPop: "",
  });

  var { updatedCity,  updatedPop } = formData;

  const [edit, setEdit] = useState("");

  const [updateCity, newCity] = useMutation(UPDATE_CITY_MUTATION, {
    
    update(cache, {data: { updateCity }}){
      const data = cache.readQuery({query: FETCH_CITIES_QUERY});
  

      
    
      cache.writeQuery({
        query: FETCH_CITIES_QUERY,
        data: { getAllCities: [...data.getAllCities, data.getAllCities.map(element => element.id === updateCity.id ? {...element,city: updateCity.city, pop: updateCity.pop} : element)]}
      });
      console.log(data)
    
    },
    onError(error){
      console.log(error)
    }
  
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //console.log(formData)
  }
    

  const onSubmit = async (e) => {
    e.preventDefault();
    setEdit("");
    if (!formData) 
      return;

    console.log(newCity)
    formData.id = edit;
    
    updateCity({
      variables: newCity.data = formData
    });
    
    //await insertData(formData);
  };

  const clickEdit = (id) => {
    setEdit(id);
  }
  
  return edit !== "" ? (
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
  ) : (
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
          <button className="actions" type="button"  >
            {/*<i>{console.log(id)}</i>*/}
            <i className="fas fa-minus-circle"/>{" "}
          </button>
        </th>
      </tr>
    </Fragment>
  );
}
  


export default DataItem;
