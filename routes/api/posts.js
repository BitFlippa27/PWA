const express = require("express");
const router = express.Router();

//@route GET api/users
//@access private
router.get("/", (req, res) => res.send("Posts route"));

module.exports = router;