import axios from "axios";
//sending token with every request
const setToken = token => {
    if (token) {
        axios.defaults.headers.common["x-auth-token"] = token;
    }else {
        delete axios.defaults.headers.common["x-auth-token"];
    }
}

export default setToken;