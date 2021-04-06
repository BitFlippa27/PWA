import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { CREATE_CITY_MUTATION, FETCH_CITIES_QUERY } from "../../graphql/queries";
import { useMutation } from "@apollo/client";
//import { CREATE_CITY_MUTATION } from "../../grapqhql/queries";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { CREATE_CITY_MUTATION } from "../../graphql/queries";


const DataForm = () => {
  const [formData, setFormData] = useState({
    city: "",
    pop: "",
  });

  const { city,  pop } = formData;

  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  }
    

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!formData) 
        return;
      //await addCity(formData);
      else {
        createCity();
        setFormData({ city: "", pop: "" });
      }
    } 
    catch (err) {
      throw new Error(err);
    }
    e.preventDefault();
    if (!formData) 
      return;
    createCity();
    setFormData({ city: "", pop: "" });
  };
  
  const [createCity, { error }] = useMutation(CREATE_CITY_MUTATION, {
    variables: formData,
    update(_, result){
      console.log(result)
    },
    onError(err){
      console.log(err);
    }
  });

  const [createCity, { error }] = useMutation(CREATE_CITY_MUTATION, {
    variables: formData,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_CITIES_QUERY
      });
      
      //data.getAllCities = [result.data.createCity, ...data.getAllCities];
      //const newGetAllCities = [...data.getAllCities, result.data.createCity ];
      //console.log(newGetAllCities);
      const newCache ={...data, getAllCities: [...data.getAllCities, result.data.createCity ]};
      console.log(newCache)

      proxy.writeQuery({query: FETCH_CITIES_QUERY, data: newCache });
    },
    onError(err){
      console.log(err)
    }
  });
  
  return (
    <Fragment>
      <tr>
        <th className="data-input2">
          <form className="form ">
            <input
              className="form-control"
              type="text"
              name="city"
              placeholder="Stadt"
              value={city}
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
              name="pop"
              placeholder="Bevölkerung"
              value={pop}
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
    </Fragment>
  );
};



export default DataForm;
