import React, { Fragment, useState } from 'react'
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

import PropTypes from 'prop-types';




const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password: "",
    password2: ""
  });

  const {name, email, password, password2} = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  }

  const onSubmit = async e => {
    e.preventDefault();
    if(password !== password2){
      setAlert("Passwörter stimmen nicht überein", "danger");
    }
    else{
      register({ name, email, password});
    }
  }
  if(isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Fragment>
     <section className="container-home">

      <h1 className="large text-primary">Registrierung</h1>
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
            name="password2"
            value={password2}
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);
