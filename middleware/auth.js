const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
    //Token vom header holen
    const token = req.header("x-auth-token");
    console.log("token", token);
    //private Route und kein Token vorhanden
    if(!token) {
        console.log("Kein Token im Header")
        return res.status(401).json({ msg: "Kein Token im Header, Authentifizierung fehlgeschlagen"});
    }

    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded.user;
        next();
    //Token aber nicht gültig
    } catch(err) {
        res.status(401).json({ msg: "Token ist nicht gültig"});
    }
}
