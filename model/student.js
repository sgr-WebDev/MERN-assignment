const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// //* creating the invoice schema
const studentSchema = new Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  school: { type: String, required: true },
  class: { type: String, required: true },
  division: { type: String, required: true },
  status: { type: Boolean, required: true },
});

// * defining model
const StudentModel = mongoose.model("Student", studentSchema);

// * exporting the model
module.exports = StudentModel;
