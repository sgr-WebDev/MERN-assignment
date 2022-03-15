const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// //* creating the invoice schema
const userSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: Boolean, default: false, required: true },
});

// * defining model
const UserModel = mongoose.model("User", userSchema);

// * exporting the model
module.exports = UserModel;
