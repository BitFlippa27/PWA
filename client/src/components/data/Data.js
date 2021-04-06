import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Loader from "../Loader";
import DataItem from "./DataItem";
import DataForm from "./DataForm";
import { VariableSizeList as List } from 'react-window';
import { useSelector } from "react-redux";
import { FETCH_CITIES_QUERY } from "../../graphql/queries";
//TODO: Button für loadServerData

const Data = () => {
  var isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { loading, data} = useQuery(FETCH_CITIES_QUERY);
  if(data) {
    console.log(data)
    var { getAllCities } = data;
  }

  
  if(!isAuthenticated)
    return <Redirect to="/login"/>;

  return loading ? <Loader/> : (
    <Fragment>
      <section className="container-data">
      <h1 className="large text-info"> Alle Daten </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Willkommen 
      </p>
      <h5 className="text-primary">Neuer Datensatz</h5>
      <div className="data-input">
        <tbody>
          <DataForm />
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
              {getAllCities.slice(getAllCities.length - 10, getAllCities.length).map( (row) => (
                <DataItem key={row.id}  data={row} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Fragment>
  );
};


export default Data;
