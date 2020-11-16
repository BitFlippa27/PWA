import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "../Loader";
import DataItem from "./DataItem";
import DataForm from "./DataForm";
import { loadLocalData } from "../../actions/data";
import { loadUser } from "../../actions/auth";





//TODO: Button für loadServerData

const Data = ({ auth: { user, loading }, allData, loadLocalData, loadUser }) => {
  useEffect(() => {
    //loadUser();
    loadLocalData();
    console.log("loadLocalData");
  }, []);

  const rows = allData;
  console.log(rows);
  /*
    var map = new Map();
    allData.forEach(item => {
      let mapValue = {
        city: item.city,
        zip: item.zip,
        pop: item.pop
      };
      map.set(item._id, mapValue);
    });
    */

  //return <div> Welcome {user  && user.name}</div>;
  //dont render UI until user is loaded so loader git in between
  return loading && user === null ? (
    <Loader />
  ) : (
    <Fragment>
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

    </Fragment>
  );
};

Data.propTypes = {
  auth: PropTypes.object.isRequired,
  loadLocalData: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  allData: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  allData: state.data.allData,
});

export default connect(mapStateToProps, { loadLocalData, loadUser })(Data);
