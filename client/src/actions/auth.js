import axios from "axios";
import { setAlert } from "./alert";
import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT, CHECK_OUT
     

    } from "./types";
import setToken from "../utils/setToken";


//Load User
export const loadUser = () =>  async dispatch => {
    if(localStorage.token) {
        setToken(localStorage.token);
    }

    try {
        const res = await axios.get("/api/auth");

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

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post("/api/users", body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

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

        dispatch(loadData());

    
    

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

//Load entire Data from MongoDB
export const loadData = () => async dispatch => {
    try {
        const res = await axios.get("api/customers");

        //console.log("DATAAAAA",res.data);
        dispatch({
            type: DATA_LOADED,
            payload: res.data
        });
        
    } catch(err) {
        //dispatch({ type: DATALOAD_FAILED });
        console.error(err);
    }
}
//Logout
export const logout = () => dispatch => {
    dispatch({ type: CHECK_OUT});
    dispatch({ type: LOGOUT}); 
    
};
    


    
