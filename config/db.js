const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
    try {
        await mongoose.connect(db, { 
            useNewUrlParser : true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("MongoDB connected !")
        return true;
        
    } catch(err) {
        console.log(err.message);
        return false;
        process.exit(1);
    }
}

module.exports = connectDB;