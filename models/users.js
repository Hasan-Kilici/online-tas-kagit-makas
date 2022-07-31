const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: {
    type:String,
    require: true,
  },
  team: {
    type:String,
    require: true,
  }
})

let user = mongoose.model("User", UserSchema);
module.exports = user;
