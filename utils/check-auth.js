const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if(authHeader){
      const token = authHeader.split("Bearer ")[1];
      if(token){
        try {
          const user = jwt.verify(token, jwtSecret);
          
          return user;
        } 
        catch (err) {
          throw new AuthenticationError("Invalid or expired Token");
        }
      }
      throw Error("Authentification token must be 'Bearer [token]");
    }
    throw new Error("Authentication header not provided");
};