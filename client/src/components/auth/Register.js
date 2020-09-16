import React, { Fragment, useState } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";



const Register = () => {
  const [formData, setFormData] = useState({
    name:"",
    email:""
  }); 

  const {name, email, password, password2} = formData;

  const onChange = e => 
    setFormData({ ...formData, [e.target.name]: e.target.value});

    

  const onSubmit = async e => {
    e.preventDefault();
    if(password !== password2){
      alert("Passwörter stimmen nicht überein");
    }
    else{
      const newUser = {
        name,
        email,
        password,
        password2
      }

      try{
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        }
        const body = JSON.stringify(newUser);
        const res = await axios.post("api/users", body, config);
        console.log(res.data);
        
      }catch(err){
        console.error(err.response.data);
      }
    }
  }
  

  return (
    <Fragment>
      <ion-button>
        Registrieren
      </ion-button>
    </Fragment>

    /*
    <Fragment>
     <section className="container">
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
            required 
          />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Passwort bestätigen"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Registrieren" />
      </form>
      <p className="my-1">
        Bereits registriert ?  <Link to="/login">Anmelden</Link>
      </p>
    </section>
  </Fragment>
  */
  );
}

export default Register;