import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Loader from "../Loader";
import { FixedSizeList as List } from 'react-window';


//TODO: Button für loadServerData

const Data = () => {
  const { loading, data: { getAllCities: cities}} = useQuery(FETCH_CITIES_QUERY);
  if(cities) {
    console.log(cities)
  }
  return loading ? <Loader/> : (
    <Fragment>
      <section className="container-data">
      <h1 className="large text-primary"> Alle Daten </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Willkommen 
      </p>

      </section>
    </Fragment>
  );
};

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
