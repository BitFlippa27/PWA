import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeData } from "../../actions/data";

const DataItem = ({ data: {id, _id, city, zip, pop }, removeData }) => {
  return (
    <Fragment>
      <tr className="formcells">
        <th scope="col">
          {city}
        </th>
        <th  scope="col">{pop}</th>
        <th scope="col">
          <button className="actions"  >
            <i className="fas fa-pencil-alt" />{" "}
          </button>
          <button className="actions" type="button" onClick={ () => {}}  >
            <i>{console.log(id)}</i>
            <i className="fas fa-minus-circle"/>{" "}
          </button>
        </th>
      </tr>
    </Fragment>
  );
}
  


export default DataItem;
