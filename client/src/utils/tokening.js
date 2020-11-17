import axios from "axios";
import jwt_decode from "jwt-decode";

//global header, send token from localStorage with every request
export const setToken = token => {
    if (token) {  //if token in localStorage
        axios.defaults.headers.common["x-auth-token"] = token;
    }else {
        delete axios.defaults.headers.common["x-auth-token"];
    }
}

export const verifyUser = async (id) => {
    const token = localStorage.token;
    if(!token) {
        return console.log("Kein Token");
    }
    try {
      const decoded = await jwt_decode(token);
      const _id = decoded.user._id;
      if(id === _id)
        return true;
      else
       return false;

    } catch(err) {
        console.log("Token ist nicht gültig");

    }
}
//export const signToken = (token) => {}
