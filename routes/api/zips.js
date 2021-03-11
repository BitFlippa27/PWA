const express = require("express");
var cors = require('cors');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth =  require("../../middleware/auth");
const checkObjectID = require("../../middleware/objectid");
const Zips = require("../../models/Zips");
const User = require("../../models/User");
const inputCheck = [
    check("city", "Bitte Stadt eingeben.").not().isEmpty(),
    check("zip", "Bitte Postleitzahl eingeben").not().isEmpty(),
    check("pop", "Bitte Bevölkerungszahl eingeben").not().isEmpty()
];


//@route POST api/zips
//@access Privat
router.post("/",auth, async (req, res) => {  //auth nicht vergessen
    const errors = validationResult(req);
    if(!errors.isEmpty()) {

        return  res.status(400).json({ errors: errors.array() });
    }

    try {
        //const user = await User.findById(req.user.id).select("-password");
        const newDataSet = new Zips({
            city: req.body.city,
            zip: req.body.zip,
            pop: req.body.pop,
            id: req.body.id
        });


        const dataSet = await newDataSet.save();
        
        res.json(dataSet);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});
//Alle Daten von MongoDB holen
//@route GET api/zips
//@access Privat
  router.get("/",auth, async (req, res) => {   //auth nicht vergessen !
    try{

        const currentData =  await Zips.find({});
        res.json(currentData);

    }catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});

// @route    DELETE api/zips/:id
// @desc     Datensatz löschen
// @access   Privat
router.delete('/:id',[auth, checkObjectID("id")], async (req, res) => {
    console.log(req.params.id);
    try {
      const dataSet = await Zips.findById(req.params.id);
  
      if (!dataSet) {
        return res.status(404).json({ msg: 'Datensatz nicht gefunden' });
      }
  
      await dataSet.remove();
  
      res.json({ msg: 'Dataset removed' });
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });


//@route GET api/zips
//@access public
//delete key
/*
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
*/

module.exports = router;
