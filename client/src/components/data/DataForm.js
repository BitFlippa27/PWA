import { useMutation } from "@apollo/client";
import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { addCityAction } from "../../actions/data";
//import { CREATE_CITY_MUTATION } from "../../grapqhql/queries";
import gql from "graphql-tag";


const DataForm = () => {
  const [formData, setFormData] = useState({
    city: "",
    pop: "",
  });
  //const addCity = useDispatch((formData) => addCityAction(formData));

  const { city,  pop } = formData;

  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  }
    

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!formData) 
        return;
      //await addCity(formData);
      else {
        createCity({variables: formData});
        setFormData({ city: "", pop: "" });
      }
    } 
    catch (err) {
      throw new Error(err);
    }
  };

  const [createCity, { error }] = useMutation(CREATE_CITY_MUTATION);
  
  
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


const CREATE_CITY_MUTATION = gql`
  mutation createCity($city: String!, $pop: Int!){
    createCity(
      createCityInput: {
        city: $city
        pop: $pop
    }){
      city
      pop
    }
  }
`;

export default DataForm;
