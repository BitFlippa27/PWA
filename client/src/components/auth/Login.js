import React, { Fragment, useState } from 'react'
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { login } from "../../actions/auth";



const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email:"",
    password: ""
    
  }); 

  const { email, password} = formData;

  const onChange = e => 
    setFormData({ ...formData, [e.target.name]: e.target.value});

    

  const onSubmit = async e => {
    e.preventDefault();
    var date = new Date();
    var time = date.toLocaleTimeString("de-DE"); 
    console.log(time)     
    login(email, password, time);
  }
  
  if(isAuthenticated) {
    return <Redirect to="/dashboard" />;  
  }

  return (
    <Fragment>
     <section className="container">
      <h1 className="large text-primary">Anmelden</h1>
      <p className="lead"><i className="fas fa-user"></i> Loggen Sie sich in ihr Konto ein</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Adresse"  
            name="email" 
            value={email}
            onChange={e =>onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Passwort"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
          <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Noch keinen Account ? <Link to="/register">Registrieren</Link>
      </p>
    </section>
  </Fragment>
  
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { login }) (Login);