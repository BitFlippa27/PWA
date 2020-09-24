import axios from "axios";
//global header, send token from localStorage with every request
const setToken = token => {
    if (token) {  //if token in localStorage
        axios.defaults.headers.common["x-auth-token"] = token;
    }else {
        delete axios.defaults.headers.common["x-auth-token"];
    }
}

export default setToken;