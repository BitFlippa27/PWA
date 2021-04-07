import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Loader from "../Loader";
import DataItem from "./DataItem";
import { VariableSizeList as List } from 'react-window';
import { useSelector } from "react-redux";
import {CREATE_CITY_MUTATION, FETCH_CITIES_QUERY } from "../../graphql/queries";
import { useMutation } from "@apollo/client";

//TODO: Button für loadServerData

const Data = () => {
  var isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [formData, setFormData] = useState({
    city: "",
    pop: "",
  });
  const { city,  pop } = formData;

  const cities = useQuery(FETCH_CITIES_QUERY);
  const { getAllCities } = data;

  const [createCity, newCity] = useMutation(CREATE_CITY_MUTATION, {
    update(cache, { data: { createCity }}){
      const data = cache.readQuery({query: FETCH_CITIES_QUERY});
      cache.writeQuery({
        query: FETCH_CITIES_QUERY,
        data: {getAllCities: [createCity, ...data.getAllCities]}
      });

    }
  });

  
  console.log(getAllCities);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  }
    
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData) 
      return;
    createCity({
      variables: {city, pop}
    })
    setFormData({ city: "", pop: "" });
  };


  if(!isAuthenticated)
    return <Redirect to="/login"/>;
  
  if(cities.loading)
  return  <Loader/>;

  if(cities.error || newCity.error)
    console.log(error);

  return (
    <Fragment>
      <section className="container-data">
      <h1 className="large text-info"> Alle Daten </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Willkommen 
      </p>
      <h5 className="text-primary">Neuer Datensatz</h5>
      <div className="data-input">
        <tbody>
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
        </tbody>
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
              {cities.slice(cities.length - 10, getAllCities.length).map( (row) => (
                <DataItem key={row.id}  cities={row} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Fragment>
  );
};


export default Data;
