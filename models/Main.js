const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MainSchema = new Schema({
    num: {
        type: Number
    },
    symboling: {
        type: Number
    },
    normalizedLosses: {
        type: Number
    },
    make: {
        type: String
    },
    aspiration: {
        type: String
    },
    doors: {
        type: Number
    },
    bodyStyle: {
        type: String
    },
    driveWheels: {
        type: String
    },
    engineLocation: {
        type: String
    },
    wheelBase: {
        type: Number
    },
    length: {
        type: Number
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    curbWeight: {
        type: Number
    },
    engineType: {
        type: String
    },
    cylinders: {
        type: Number
    },
    fuelSystem: {
        type: String
    },
    engineType: {
        type: String
    },
    bore: {
        type: Number
    },
    stroke: {
        type: Number
    },
    compressionRatio: {
        type: Number
    },
    horsepower: {
        type: Number
    },
    peakRPM: {
        type: Number
    },
    litersPer100: {
        type: Number
    },
    mpg: {
        type: Number
    },
    price: {
        type: Number
    },
    horsepowerBinned: {
        type: Number
    },
    diesel: {
        type: Boolean
    },
    gas: {
        type: Boolean
    }
    
});

module.exports = Main = mongoose.model("main", MainSchema);