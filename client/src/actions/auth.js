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
import {setToken } from "../utils/tokening";
import jwt_decode from "jwt-decode";



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
    console.error(err);
    dispatch({
      type: ALL_USER_LOADED_FAILED
    });
  }
}

//Load User
export const loadUser = () =>  async dispatch => {
  console.log("loadUser")
  if(localStorage.token) {
    setToken(localStorage.token);
  }
    try {
      console.log("getReq")
      const res = await axios.get("/api/auth");
      const user = res.data;

      dispatch({
        type: USER_LOADED,
        payload: user
      });
      dispatch(loadServerData());
    }
    catch(err) {
      console.error(err);
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
    var token = res.data;
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
    var token = res.data;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: token
    });
    dispatch(loadUser());
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

};

//Logout
export const logout = () => async (dispatch) => {
  dispatch({ type: CHECK_OUT});
  dispatch({ type: LOGOUT});
};




  

























    /*
    var currentUser = await dexie.currentUser.get("email", async () => {
      try {
        const resultArray = await dexie.users.where("email").equals(email).toArray();
      }catch(err) {
        console.error(err);
      }
      return resultArray[0];
      });
      */

/*
const addUserToDexie = async (user) => {
  try {
    await dexie.currentUser.add(user);
  }
  catch(err) {
    console.error(err);
  }
}
*/
/*
const userInDexie = async (id) => {
  try {
    const user =  await dexie.currentUser.get(id);
    console.log(user)
    if(user)
      return true;
    else
      return false;
  }
  catch(err) {
    console.error(err);
  }
}
*/
/*const getCurrentUser = async (id) => {
  try {
    const user =  await dexie.currentUser.get(id);
    return user;
  }
  catch(err) {
    console.error(err);
  }
}
*/