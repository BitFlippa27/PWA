import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeData } from "../../actions/data";
import DataForm from "./DataForm";


const DataItem = ({ row: {id, _id, city, zip, pop }, removeData }) => {
  const [formData, setFormData] = useState({
    city: "",
    pop: "",
  });

  const [edit, setEdit] = useState({
    id: null
  });


  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  }
    

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData) 
      return;
    setFormData({ city: "", pop: "" });
    setEdit({id: null});
    //await insertData(formData);
  };

  const editCity = (id) => {
    setEdit({
      id: id
    })
  }

  const updateInput = (
    <tr>
      <th className="data-input2">
        <form className="form ">
          <input
            className="form-control"
            type="text"
            name="city"
            placeholder="Stadt"
            value={city}
            onChange={(e) => onChange(e)}
            required
          ></input>
        </form>
      </th>
      <th className="data-input2">
        <form className="form ">
          <input
            className="form-control"
            type="number"
            name="pop"
            placeholder="Bevölkerung"
            value={pop}
            onChange={(e) => onChange(e)}
            required
          ></input>
            </form>
      </th>

    <th>
      <form className="form " onSubmit={(e) => onSubmit(e)}>
        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
    </th>
   </tr>
  )
  
    
    return edit.id ? updateInput : (
    <Fragment>
      <tr >
        <th  scope="col">
          {city}
        </th>
        <th  scope="col">{pop}</th>
        <th scope="col">
          <button className="actions" onClick={ () => editCity(id)}  >
            <i className="fas fa-pencil-alt" />{" "}
          </button>
          <button className="actions" type="button"  >
            {/*<i>{console.log(id)}</i>*/}
            <i className="fas fa-minus-circle"/>{" "}
          </button>
        </th>
      </tr>
    </Fragment>
  );
}
  


export default DataItem;
