const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const inputChecks = [
    check("email", "Bitte geben Sie eine gültige Email ein.").isEmail(),
    check("password", "Das Passwort wird benötigt").exists()
];
const User = require("../../models/User");

//@route GET api/users
//@desc Authentifizierung
//@access privat
router.get("/", auth, async(req,res) => {   //Parameter auth, macht diese Route privat
    try {
        const user = await User.findById(req.user.id).select("-password");  //req.user.id included in token
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});  

//@route POST api/auth
//@desc Authentifizierung
//@access öffentlich
router.post("/", inputChecks, async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    const { email, password } = req.body;
    

    try {
        let user = await User.findOne({ email });
        //Wenn User nicht gefunden
        if(!user) {
            return res.status(400).json(
                { 
                    errors: [{msg: "Ungültige Anmeldedaten"}]
                });
        }

        const matching = await bcrypt.compare(password, user.password);

        if(!matching) {
            return res.status(400).json(
                { 
                    errors: [{msg: "Ungültige Anmeldedaten"}]
                });
        }
         
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload,
            config.get("jwtSecret"),
            { expiresIn: 360000 },
            (err, token) => { 
                if (err) throw err;
                res.json({ token })
             }
            );
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
    

    
});

module.exports = router;
