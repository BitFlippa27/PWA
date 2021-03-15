import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeData } from "../../actions/data";

const DataItem = ({ data: {id, _id, city, zip, pop }, removeData }) => {
  return (
    <Fragment>
      <tr key={id}>
        <th scope="col">{city}</th>
        <th scope="col">{zip}</th>
        <th scope="col">{pop}</th>
        <th scope="col">
          <button className="actions"  >
            <i className="fas fa-pencil-alt" />{" "}
          </button>
          <button className="actions" type="button" onClick={ () => removeData(id, _id)}  >
            <i>{console.log(id)}</i>
            <i className="fas fa-trash-alt"  />{" "}
          </button>
        </th>
      </tr>
    </Fragment>
  );
}
  


DataItem.propTypes = {
  data: PropTypes.object.isRequired,
  removeData: PropTypes.func.isRequired
};

export default connect(null, { removeData })(DataItem);
