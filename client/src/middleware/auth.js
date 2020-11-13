import jwt_decode from "jwt-decode";
const jwt = require("jsonwebtoken");


export const verifyToken = () => {
    const token = localStorage.token;
    if(!token) {
        return console.log("Kein Token");
    }
    try {
      const decoded = jwt_decode(token);
      //console.log(decoded)


      return decoded;

    } catch(err) {
        console.log("Token ist nicht gültig");

    }
}
//export const signToken = (token) => {}
