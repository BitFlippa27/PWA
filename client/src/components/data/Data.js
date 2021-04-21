import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import Loader from "../Loader";
import DataItem from "./DataItem";
import { VariableSizeList as List } from 'react-window';
import { useSelector } from "react-redux";
import { FETCH_CITIES_QUERY, CREATE_CITY_MUTATION } from "../../graphql/queries";
import * as updateFunctions from "../../graphql/updateFunctions";
//TODO: Button für loadServerData

const Data = () => {
  console.log("Data")
  const cities = useQuery(FETCH_CITIES_QUERY);
  
  var isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  var username = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    city: "",
    pop: "",
  });

  const { city,  pop } = formData;

  const [addCity, newCity] = useMutation(CREATE_CITY_MUTATION);
  
  if(newCity.error)
    console.log(newCity);

  if(!isAuthenticated)
    return <Redirect to="/login"/>;
  
  if(cities.error)
    console.log(cities.error)
  
  if(cities.loading){
    console.log("DATA loading")
    return <Loader/>
  }
    

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });    
  }
      
  
  const onSubmit = async (e) => {
    e.preventDefault();
    if(formData.city === "" || formData.pop === "") 
      return;
    
    const { city, pop } = formData;

    addCity({
      variables: {city: city, pop: pop},
      update: updateFunctions.createCity,
      context: {
        tracked: true,
        serializationKey: "MUTATION"
      },
      optimisticResponse: {
        __typename: "Mutation",
        createCity: {
          __typename: "City", 
          id: "whatever",
          city: city,
          pop: pop,
        }
      },
      
    });
    setFormData({ city: "", pop: "" });
  };
  
  return (
    <Fragment>
      <section className="container-data">
      <h1 className="large text-info"> Alle Daten </h1>
      <p className="lead"> 
        <i className="fas fa-user"></i> Willkommen 
      </p>
      
      <h5 className="text-primary">Neuer Datensatz</h5>
      <div className="data-input">
      
        <Fragment>
      
        <div className="data-input2">
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
          </div>
          <div className="data-input2">
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
        </div>

          <div>
          <form className="form " onSubmit={(e) => onSubmit(e)}>
            <input type="submit" className="btn btn-primary" value="Submit" />
          </form>
        </div>
     
      
    </Fragment>
      </div>

      <div className="table-responsive">
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th  scope="col">
                  <strong>Stadt</strong>
                </th>
                <th scope="col">
                  <strong>Bevölkerung</strong>
                </th>
                <th scope="col">
                  <strong>Aktion</strong> 
                </th>
              </tr>
            </thead>
            <tbody>
              {cities.data.getAllCities.slice(cities.data.getAllCities.length - 15, cities.data.getAllCities.length).map( (row) => (
                <DataItem key={row.id}  row={row} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Fragment>
  );
};


export default Data;


/*
const [createCity, { error }] = useMutation(CREATE_CITY_MUTATION, {
    variables: formData,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_CITIES_QUERY
      });
      
      
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
  
*/