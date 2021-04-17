import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import Loader from "../Loader";
import DataItem from "./DataItem";
import { VariableSizeList as List } from 'react-window';
import { useSelector } from "react-redux";
import { FETCH_CITIES_QUERY, CREATE_CITY_MUTATION } from "../../graphql/queries";
//TODO: Button für loadServerData

const Data = () => {
  console.log("Data")
  const cities = useQuery(FETCH_CITIES_QUERY, {
    fetchPolicy: "cache-first"
  });
  
  var isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  var username = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    city: "",
    pop: "",
  });

  const { city,  pop } = formData;

  

  const [addCity, newCity] = useMutation(CREATE_CITY_MUTATION, {

    update(cache, {data: { createCity }}){
      console.log("update response createCity", createCity)
      const data = cache.readQuery({query: FETCH_CITIES_QUERY});
      console.log(" data after readQuery ", data)

      const updatedArray = [...data.getAllCities, createCity];
      console.log("updatedArray",updatedArray)
      const newData = {...data, getAllCities: updatedArray};
      console.log("newData", newData)

      cache.writeQuery({
        query: FETCH_CITIES_QUERY,
        data: newData
      });
      newCity.data = createCity;
      console.log("data after writeQuery", data)
      console.log("newCity after writeQuery",newCity)
    },
    onError(error){
      console.log(error)
    }
  })
  
  console.log("newCity global",newCity)


  if(!isAuthenticated)
    return <Redirect to="/login"/>;
  
  if(cities.error)
    console.log(cities.error)
  
  if(newCity.error)
    console.log(newCity.error)
  
  if(cities.loading)
    return <Loader/>

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });    
  }
      
  
  const onSubmit = async (e) => {
    e.preventDefault();
    if(formData.city === "" || formData.pop === "") 
      return;
    
    const { city, pop } = formData;
    newCity.data = formData;
    addCity({
     optimisticResponse: {
        __typename: "Mutation",
        createCity: {
          id: "whatever",
          __typename: "City", 
          city: city,
          pop: pop,
        }
      },
      variables: {city: city, pop: pop}
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
              {cities.data.getAllCities.slice(cities.data.getAllCities.length - 10, cities.data.getAllCities.length).map( (row) => (
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