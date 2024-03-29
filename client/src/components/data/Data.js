import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "../Loader";
import DataItem from "./DataItem";
import DataForm from "./DataForm";
import { loadAllLocalData, loadAllServerData } from "../../actions/data";

//TODO: Button für loadServerData

const Data = ({ auth: { user, loading }, allData, loadAllLocalData }) => {
  useEffect(() => {
    loadAllLocalData();
    }
  ,[loadAllLocalData]);

  const rows = allData;
  console.log(rows);

  

  return user === null || loading || allData.length < 27000 ? (
    <Loader />
  ) : (
    <Fragment>
      <section className="container-data">
      <h1 className="large text-info"> Alle Daten </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Willkommen {user && user.name}
      </p>

      <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th key={rows.title} scope="col">
                  Marke
                </th>
                <th key={rows.description} scope="col">
                  Modell
                </th>
                <th scope="col">Aktion </th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(rows.length - 5, rows.length).map( (row) => (
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
