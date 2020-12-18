import React, { Fragment } from "react";
import Proptypes from "prop-types";
import { connect } from "react-redux";

const DataItem = ({ data: { _id, city, zip, pop }, index }) => {
  return (
    <Fragment>
      <tr key={index}>
        <th scope="col">{city}</th>
        <th scope="col">{zip}</th>
        <th scope="col">{pop}</th>
        <th scope="col">
          <button className="actions">
            <i className="fas fa-pencil-alt" />{" "}
          </button>
          <button className="actions" onClick={() => (index)}>
            <i className="fas fa-trash-alt" />{" "}
          </button>
        </th>
      </tr>
    </Fragment>
  );
}
  


DataItem.propTypes = {
  data: Proptypes.object.isRequired,
};

export default connect(null, {})(DataItem);
