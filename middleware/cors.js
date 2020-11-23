module.exports = function(req, res, next) {
    try {
        res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    //Token aber nicht gültig
    } catch(err) {
        res.status(401).json({ msg: "CORS Header error"});
    }
}
