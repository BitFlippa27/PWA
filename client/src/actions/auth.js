import axios from "axios";
import { setAlert } from "./alert";
import { loadServerData } from "./data";
import { dexie } from "../dexie";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CHECK_OUT,
    CLIENT_DATALOAD_SUCCESS




    } from "./types";
import setToken from "../utils/setToken";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

//import { auth } from "../middleware/auth";



//Load User
export const loadUser = () =>  async dispatch => {
    if(localStorage.token) {
        setToken(localStorage.token);
    }

    try {

      var res = await axios.get("/api/auth");
      const user = res.data;

      dispatch({
        type: CLIENT_DATALOAD_SUCCESS,
        payload: user
      });

    }catch(err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  }








//Register User
export const register = ({ name, email, password}) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post("/api/users", body, config);
      console.log(res)
      const user = res.data.payload.user;
      //console.log(res.config.data)
      const token = res.data;

      await dexie.users.add(user);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: token
      });
      dispatch(setAlert("Datensatz hinzugefügt", "success"));
    }
    catch(err) {

      const errors = err.response.data.errors;  //array of errors

      if(errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
      }

      console.error(err);
      dispatch({
        type: REGISTER_FAIL
      });
    }
  }


  /*
  const res = await dexie.users.get("email", async () => {
    const resultArray = await dexie.users.where("email").equals(email).toArray();
    return resultArray[0];
  });
  */







//Login User
export const login = ( email, password ) => async dispatch => {


    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post("/api/auth", body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());

        dispatch(loadServerData());

    }catch (err) {
        console.log(err)
        const errors = err.response.data.errors;  //array of errors

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }
};






//Logout
export const logout = () => dispatch => {
    dispatch({ type: CHECK_OUT});
    dispatch({ type: LOGOUT});

};
