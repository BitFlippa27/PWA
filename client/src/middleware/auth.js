const jwt = require("jsonwebtoken");


export const auth = () => {
    const token = localStorage.token;
    if(!token) {
        return console.log("Kein Token");
    }
    try {
      const decoded = jwt.verify(token, "jwtSecret");
      const user = decoded.user;

      return user;

    } catch(err) {
        console.log("Token ist nicht gültig");

    }
}
