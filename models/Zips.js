const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ZipsSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    id: {
        type: Number
    }

});

module.exports = Main = mongoose.model("zip2", ZipsSchema);
