const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth =  require("../../middleware/auth");
const Zips = require("../../models/Zips");
const User = require("../../models/User");
const inputCheck = [
    check("city", "Bitte Stadt eingeben.").not().isEmpty(),
    check("zip", "Bitte Postleitzahl eingeben").not().isEmpty(),
    check("pop", "Bitte Bevölkerungszahl eingeben").not().isEmpty()
];



//@route POST api/zips
//@access private
router.post("/", auth, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {

        return  res.status(400).json({ errors: errors.array() });
    }

    try {
        //const user = await User.findById(req.user.id).select("-password");
        const newDataSet = new Zips({
            city: req.body.city,
            zip: req.body.zip,
            pop: req.body.pop
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
//@route GET api/zips
//@access private
  router.get("/",auth, async (req, res) => {   //auth nicht vergessen !
    try{

        const currentData =  await Zips.find({});
        console.log(req);
        res.json(currentData);

    }catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});

//@route GET api/zips
//@access public
//delete key

router.delete("/", async (req, res) => {
    try {

          const allData = await Zips.find({});
          allData.map(account => {
            delete account.products
            account.save;
          });



        //zips.deleteOne({}, {birthdate: undefined}, {isDeleted:true});
        res.json("gelöscht!!!");
    }
    catch(err) {
        console.error(err);
    }
});


module.exports = router;
