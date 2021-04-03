import React, { Fragment, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Loader from "../Loader";
import DataItem from "./DataItem";
import DataForm from "./DataForm";
import { VariableSizeList as List } from 'react-window';



//TODO: Button für loadServerData

const Data = () => {
  const { loading, data} = useQuery(FETCH_CITIES_QUERY);
  if(data) {
    console.log(data)
    var { getAllCities } = data;
  }
  
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
              {getAllCities.slice(getAllCities.length - 100, getAllCities.length).map( (row) => (
                <DataItem key={row.id}  data={row} />
              ))}
            </tbody>
          </table>
        </div>
      

      
         
 
      

      
      
      
      
      
      </section>
    </Fragment>
  );
};
const rowSizes = new Array(1000)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 50));

const getItemSize = index => rowSizes[index];
const Row = ({ index, style }) => (
  <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
    Row {index}
  </div>
);

const FETCH_CITIES_QUERY = gql`
  {
    getAllCities {
     city 
     pop
     id
    }
  }
`;


export default Data;
