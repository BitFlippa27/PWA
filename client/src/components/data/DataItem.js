import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeData } from "../../actions/data";
import DataForm from "./DataForm";

const DataItem = ({ data: {id, _id, city, zip, pop }, removeData }) => {

  const [edit, setEdit] = useState({
    id: null
  });

  const editCity = (id) => {
    setEdit({
      id: id
    })
  }

  if(edit.id) {
    return <DataForm/>;
  }
  return (
    <Fragment>
      <tr className="formcells">
        <th  scope="col">
          {city}
        </th>
        <th  scope="col">{pop}</th>
        <th scope="col">
          <button className="actions" onClick={ () => editCity(id)}  >
            <i className="fas fa-pencil-alt" />{" "}
          </button>
          <button className="actions" type="button"  >
            <i>{console.log(id)}</i>
            <i className="fas fa-minus-circle"/>{" "}
          </button>
        </th>
      </tr>
    </Fragment>
  );
}
  


export default DataItem;
