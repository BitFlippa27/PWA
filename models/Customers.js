const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomersSchema = new Schema({
    city: {
        type: String
    },
    zip: {
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
    }
    
    
       
    
    
});

module.exports = Main = mongoose.model("customers", CustomersSchema);