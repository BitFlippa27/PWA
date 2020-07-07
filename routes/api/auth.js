const express = require("express");
const router = express.Router()

//@route GET api/users
//@desc Authentifizierung
//@access privat
router.get("/", (req,res) => res.send("Auth route"));

module.exports = router;
