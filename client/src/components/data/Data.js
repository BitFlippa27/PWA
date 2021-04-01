import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Loader from "../Loader";
import DataItem from "./DataItem";
import DataForm from "./DataForm";
import { loadAllLocalData, loadAllServerData } from "../../actions/data";

//TODO: Button für loadServerData

const Data = ({ auth: { user }, allData, loadAllLocalData }) => {
  const { loading, data } = useQuery(FETCH_CITIES_QUERY);

  

  

  return user === null || data.length < 27000 ? (
    <Loader />
  ) : (
    <Fragment>
      <section className="container-data">
      <h1 className="large text-primary"> Alle Daten </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Willkommen {user && user.name}
      </p>

      <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th key={data.city} scope="col">
                  Stadt
                </th>
                <th key={data.zip} scope="col">
                  ZIP
                </th>
                <th key={data.pop} scope="col">
                  Bevölkerung
                </th>
                <th scope="col">Aktion </th>
              </tr>
            </thead>
            <tbody>
              {data.slice(data.length - 5, data.length).map( (row) => (
                <DataItem key={row.id}  data={row} />
              ))}

              <DataForm />
            </tbody>
          </table>
      </div>
      </section>
    </Fragment>
  );
};

const FETCH_CITIES_QUERY = gql `
  {
    getCitties {
      id
      city 
      pop
      createdAt
      username
    }
  }
`

Data.propTypes = {
  auth: PropTypes.object.isRequired,
  loadAllLocalData: PropTypes.func.isRequired,
  loadServerData: PropTypes.func.isRequired,
  allData: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  allData: state.data.allData,
});

export default connect(mapStateToProps, { loadAllLocalData, loadAllServerData })(Data);
