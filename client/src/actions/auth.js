import axios from "axios";
import { setAlert } from "./alert";
import { loadServerData } from "./data";
import { dexie } from "../dexie";
import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    USER_LOADED,
    USER_LOADED_FAILED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    CHECK_OUT,
    ALL_USER_LOADED_SUCCESS,
    ALL_USER_LOADED_FAILED
} from "./types";
import setToken from "../utils/setToken";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { verifyUser } from "../middleware/auth";

//import { auth } from "../middleware/auth";
export const loadAllUsers = () => async dispatch => {
  try {
    const usersTable = await dexie.table("users").toArray();
    if(usersTable.length === 0) {
      var res = await axios.get("api/users");
      var allUsers = res.data;
      await dexie.users.bulkAdd(allUsers);

      dispatch({
        type: ALL_USER_LOADED_SUCCESS,
        payload: allUsers
      });
    }
    else {
      dispatch({
        type: ALL_USER_LOADED_SUCCESS,
        payload: usersTable
      });
    }
  }
  catch(err) {
    dispatch({
      type: ALL_USER_LOADED_FAILED,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
}
//Load User
export const loadUser = (email) =>  async dispatch => {
    if(localStorage.token) {
        setToken(localStorage.token);
    }


    try {
      var currentUser = await dexie.currentUser.get("email", async () => {
        const resultArray = await dexie.users.where("email").equals(email).toArray();
        return resultArray[0];
      });
      console.log(currentUser);
      //var currentUser = await dexie.currentUser.get(email);
      if(!currentUser) {
        var res = await axios.get("/api/auth");
        const user = res.data;
        await dexie.currentUser.add(user);

        dispatch({
          type: USER_LOADED,
          payload: user
        });
      }
      /*
      else {
        //const user = verifyUser();
        dispatch({
          type: USER_LOADED,
          payload: user
        });
      }
*/

    }catch(err) {
      console.error(err)
      dispatch({
        type: USER_LOADED_FAILED
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
    var res = await axios.post("/api/users", body, config);
    const user = res.data.payload.user;
    var token = res.data;

    await dexie.currentUser.add(user);
  }
  catch(err) {

    const errors = err.response.data.errors;  //array of errors

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    console.error(err);
    dispatch({
      type: REGISTER_FAILED
    });
  }

  dispatch({
    type: REGISTER_SUCCESS,
    payload: token
  });
  dispatch(setAlert("Sie sind jetzt registriert !", "success"));
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
    var res = await axios.post("/api/auth", body, config);
    console.log(res)
  }
  catch (err) {
    console.log(err)
    const errors = err.response.data.errors;  //array of errors

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAILED
    });
  }
  dispatch({
    type: LOGIN_SUCCESS,
    payload: res.data
  });

  dispatch(loadUser(email));
  dispatch(loadServerData());
};

//Logout
export const logout = () => async (dispatch) => {
  dispatch({ type: CHECK_OUT});
  dispatch({ type: LOGOUT});
};
