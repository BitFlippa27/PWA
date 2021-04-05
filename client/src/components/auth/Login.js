import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../actions/auth";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { setAlert } from "../../actions/alert";
import { result } from "lodash";
import Data from "../data/Data";
import  store  from "../../store";
import { LOGIN_USER } from "../../grapqhql/queries";



const Login = ({ setAlert }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  
  
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    try {
      e.preventDefault();
      if(!formData)
        return;
      else{
        await loginUser();
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData}}){
      console.log(userData)
     if (userData)
      store.dispatch(loginUserAction(userData))
    },
    onError(err){
      console.log(err);
      //setErrors(err.graphQLErrors[0].extensions.exception.errors);
      
    },
    variables: formData
  });


  return isAuthenticated ? <Redirect to="/data"/> : (
    <Fragment>
      <section className="container-home">
        <h1 className="large text-info">Anmelden</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Loggen Sie sich in ihr Konto ein
        </p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group ">
            <input 
              type="email"
              placeholder="Email Adresse"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group ">
            <input 
              type="password"
              placeholder="Passwort"
              name="password"
              minLength="6"
              value={password}
              onChange={(e) => onChange(e)}
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
};


export default Login;
