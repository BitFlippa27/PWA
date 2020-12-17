import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "../Loader";
import DataItem from "./DataItem";
import DataForm from "./DataForm";
import { loadLocalData, loadServerData } from "../../actions/data";

//TODO: Button für loadServerData

const Data = ({ auth: { user, loading }, allData, loadLocalData, loadServerData }) => {
  useEffect(() => {
      loadLocalData();
    }
  ,[loadLocalData]);

  const rows = allData;
  console.log(rows);

  

  return user === null ? (
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
                <th key={rows.city} scope="col">
                  Stadt
                </th>
                <th key={rows.zip} scope="col">
                  ZIP
                </th>
                <th key={rows.pop} scope="col">
                  Bevölkerung
                </th>
                <th scope="col">Aktion </th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(rows.length - 5, rows.length).map((row, index) => (
                <DataItem key={index} index={index} data={row} />
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
  loadLocalData: PropTypes.func.isRequired,
  loadServerData: PropTypes.func.isRequired,
  allData: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  allData: state.data.allData,
});

export default connect(mapStateToProps, { loadLocalData, loadServerData })(Data);
