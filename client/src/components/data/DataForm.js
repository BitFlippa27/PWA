import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { insertData, removeData } from "../../actions/data";

const DataForm = ({ insertData }) => {
  const [formData, setFormData] = useState({
    city: "",
    zip: "",
    pop: "",
  });
  const { city, zip, pop } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData) 
      return;
    setFormData({ city: "", zip: "", pop: "" });
    await insertData(formData);
  };

  return (
    <Fragment>
      <tr className="formcells">
        <th>
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
        <th>
          <form className="form ">
            <input
              className="form-control"
              type="number"
              name="zip"
              placeholder="PLZ"
              value={zip}
              onChange={(e) => onChange(e)}
              required
            ></input>
          </form>
        </th>
        <th>
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
    </Fragment>
  );
};

DataForm.propTypes = {
  insertData: PropTypes.func.isRequired,
};

export default connect(null, { insertData })(DataForm);
