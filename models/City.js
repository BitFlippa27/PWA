const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  city: String,
  pop: Number,
  createdAt: String,
  username: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = City = mongoose.model("zips", CitySchema);
