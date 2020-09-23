import React, { Fragment, useState } from 'react'
import { Link } from "react-router-dom";



const Login = () => {
  const [formData, setFormData] = useState({
    email:"",
    password: ""
    
  }); 

  const { email, password, password2} = formData;

  const onChange = e => 
    setFormData({ ...formData, [e.target.name]: e.target.value});

    

  const onSubmit = async e => {
    e.preventDefault();
    console.log("SUCCESS");
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

export default Login;