import React, { Fragment, useState } from 'react'
import { useSelector } from "react-redux";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import { REGISTER_USER } from "../../graphql/queries";

const Register = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password: "",
    confirmPassword: ""
  });

  const {name, email, password, confirmPassword} = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  }

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result){
  
      //setAlert("Account erstellt", "success");
    },
    onError(err){
      console.log(err);
    },
    variables: formData
  });

  const onSubmit = async e => {
    try {
      e.preventDefault();
      if(password !== confirmPassword){
        setAlert("Passwörter stimmen nicht überein", "danger");
        return;
      }
      if(!formData)
        return;
      else{
        await addUser();
  
      }
    }
    catch (err) {
      throw new Error(err);
    }
  }
   


  return isAuthenticated ? <Redirect to="/data"/> : (
    <Fragment>
     <section className="container-home">

      <h1 className="large text-info">Registrierung</h1>
      <p className="lead"><i className="fas fa-user"></i> Erstellen Sie ihr Konto</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input 
            type="text"
            placeholder="Name"
            name="name"
            value= {name}
            onChange={e => onChange(e)}

          />
        </div>
        <div className="form-group">
          <input 
            type="email"
            placeholder="Email Adresse"
            name="email"
            value={email}
            onChange={e =>onChange(e)}

          />
        </div>
        <div className="form-group">
          <input 
            type="password"
            placeholder="Passwort"
            name="password"
            value={password}
            onChange={e => onChange(e)}

          />
        </div>
        <div className="form-group">
          <input 
            type="password"
            placeholder="Passwort bestätigen"
            name="confirmPassword"
            value={confirmPassword}
            onChange={e => onChange(e)}

          />
        </div>
        <input type="submit" className="btn btn-primary" value="Registrieren" />
      </form>
      <p className="my-1">
        Bereits registriert ?  <Link to="/login">Anmelden</Link>
      </p>
    </section>
  </Fragment>

  );
}






export default Register;
