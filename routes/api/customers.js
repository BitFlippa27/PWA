const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth =  require("../../middleware/auth");
const Customers = require("../../models/Customers");
const User = require("../../models/User");
const inputCheck = [
    check("name", "Bitte Marke eingeben.").not().isEmpty()
];



//@route POST api/customers
//@access private
router.post("/", auth, inputCheck, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        
        return  res.status(400).json({ errors: errors.array() });
    }

    try {
        //const user = await User.findById(req.user.id).select("-password");
        const newDataSet = new Customers({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email
        });

        
        const dataSet = await newDataSet.save();
        console.log(dataSet)
        res.json(dataSet);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
   
});
//get all data
//@route GET api/customers
//@access private
router.get("/",auth, async (req, res) => {
    try{
        
        const currentData =  await Customers.find({});
        res.json(currentData);
    
    }catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
    
});

//@route GET api/customers
//@access public
//delete key

router.patch("/", async (req, res) => {
    try {
        Customers.update({}, {$unset: {birthdate:""}}, {multi:true});
        res.json("gelöscht!!!");
    }
    catch(err) {
        console.error(err);
    }
});


module.exports = router;
    
        
            
            
            