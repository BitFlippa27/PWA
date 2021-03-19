const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema({
    city: {
        type: String
    },
    zip: {
        type: Number
    },
    pop: {
       type: Number
    }

});

module.exports = City = mongoose.model("zips", CitySchema);
