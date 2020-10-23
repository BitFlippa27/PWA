const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ZipsSchema = new Schema({
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

module.exports = Main = mongoose.model("zips", ZipsSchema);
