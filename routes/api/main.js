const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth =  require("../../middleware/auth");
const Main = require("../../models/Main");
const User = require("../../models/User");
const inputCheck = [
    check("make", "Bitte Marke eingeben.").not().isEmpty()
];

//@route GET api/users
//@access private
router.get("/", auth, inputCheck, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return  res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select("-password");
        const newDataSet = new Main({
            user: req.user.id,
            make: req.body.make
        });
        
        const post = await newDataSet.save();
        res.json(post);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
   
});

module.exports = router;