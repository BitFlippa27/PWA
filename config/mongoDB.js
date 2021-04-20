const mongoose = require("mongoose");
const { mongoURI } = require("./config");


const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, { 
            useNewUrlParser : true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false 
        });
        await mongoose.set("returnOriginal", false);
        console.log("MongoDB connected !")
        
        
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;