import React, { useState, Fragment } from "react";
import { CREATE_CITY_MUTATION, FETCH_CITIES_QUERY } from "../../graphql/queries";
import { useMutation } from "@apollo/client";


const DataForm = () => {
  const [formData, setFormData] = useState({
    city: "",
    pop: "",
  });

  const { city,  pop } = formData;

  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  }
    

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData) 
      return;
    createCity({
      variables: {city, pop}
    })
    setFormData({ city: "", pop: "" });
    
  };

  const [createCity, newCity] = useMutation(CREATE_CITY_MUTATION, {
    update(cache, { data: { createCity }}){
      const data = cache.readQuery({query: FETCH_CITIES_QUERY});
      cache.writeQuery({
        query: FETCH_CITIES_QUERY,
        data: {getAllCities: [createCity, ...data.getAllCities]}
      });

    }
  });
  
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



/*
mutate({
      variables: {city, pop},
      optimisticResponse: {
        __typename: "Mutation",
        createCity: {
          __typename: "City",
          city: city,
          pop: pop,
          createdAt: new Date().toISOString()
        }
      },
      update(proxy, result) {
        const data = proxy.readQuery({
          query: FETCH_CITIES_QUERY,
          optimistic: true
        });
    
        proxy.writeQuery({query: FETCH_CITIES_QUERY, data: {
          getAllCities: [...data.getAllCities, result.data.createCity]
        }});
      },
      onError(err){
        console.log(err)
      }
      });
*/