const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomersSchema = new Schema({
    username: {
        type: String
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    birthdate: {
        type: Date
    },
    email: {
        type: String
    },
    active: {
        type: Boolean
    },
    accounts: {
        type: Array
    }

    
});

module.exports = Main = mongoose.model("customers", CustomersSchema);