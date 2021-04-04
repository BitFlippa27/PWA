import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { addCityAction } from "../../actions/data";


const DataForm = ({ insertData, edit }) => {
  const [formData, setFormData] = useState({
    city: "",
    pop: "",
  });
  const addCity = useDispatch((formData) => addCityAction(formData));

  const { city,  pop } = formData;

  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  }
    

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData) 
      return;
    await addCity(formData);
    setFormData({ city: "", pop: "" });
    
  };

  
  return (
    <Fragment>
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
    </Fragment>
  );
};



export default DataForm;
