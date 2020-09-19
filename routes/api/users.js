const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const inputChecks = [
    check("name", "Name wird benötigt ").not().isEmpty(),
    check("email", "Bitte geben Sie eine gültige Email ein.").isEmail(),
    check("password", "Bitte geben Sie ein Passwort mit 7 oder mehr Zeichen ein.").isLength({ min: 7})
];
const User = require("../../models/User");

//@route POST api/users
//@desc User registrieren
//@access öffentlich
router.post("/", inputChecks, async(req,res) => {
    //console.log("api/users register", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ errors: [{msg: "Email bereits vergeben"}]});
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(13);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

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
