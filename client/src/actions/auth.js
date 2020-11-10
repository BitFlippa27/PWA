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
    LOGOUT, CHECK_OUT,



    } from "./types";
import setToken from "../utils/setToken";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

//import { auth } from "../middleware/auth";


//TODO: offline handlen, token in indexedDB speichern
//Load User
export const loadUser = () =>  async dispatch => {
    if(localStorage.token) {
        setToken(localStorage.token);
    }


    try {
        var res = await axios.get("/api/auth");

        dispatch({
            type: USER_LOADED,
            payload: res.data  //User
        });


    }catch(err) {
        dispatch({
            type: AUTH_ERROR
        });
      }



};


//Register User
export const register = ({ name, email, password}) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    //const body = JSON.stringify({ name, email, password });


    try {
        console.log("register()")
        var user = await dexie.users.where("email").equals(email);

    } catch(err) {
      console.error(err);
    }
    if(user.toArray()) {
      console.log(user)
      dispatch(setAlert("Email bereits vergeben !", "danger"));
      return;
    }

    try {
          const salt = await bcrypt.genSalt(13);
          const pwHashed = await bcrypt.hash(password, salt);

          user = {
            name: name,
            email: email,
            password: pwHashed
          };

          await dexie.users.add(user);

          const jwtPayload = {
            user: {
                email: user.email
              }
            };

            const jwtToken = jwt.sign(jwtPayload,
                "jwtSecret",
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    return token;
                 }
                );
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: jwtToken
                });







        //if online upload to server
        //const res = await axios.post("/api/users", body, config);
        //const user = res.data;




    }  catch (err) {
       const errors = err.response.data.errors;  //array of errors

       if(errors) {
           errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
};
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
