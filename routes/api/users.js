const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

//@route GET api/users
//@desc User registrieren
//@access öffentlich
router.post("/", [
    check("name", "Name wird benötigt ").not().isEmpty(),
    check("email", "Bitte geben Sie eine gültige Email ein.").isEmail(),
    check("password", "Bitte geben Sie ein Passwort mit 7 oder mehr Zeichen ein.").isLength({ min: 7})
], (req,res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    res.send("User route");
});


module.exports = router;
