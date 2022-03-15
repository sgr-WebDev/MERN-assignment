const UserModel = require("../model/user");
const StudentModel = require("../model/student");

module.exports = {
  allStudents: async (req, res) => {
    const user = await UserModel.findById(req.body._id);
    if (user !== null || user !== []) {
      if (user.status === true) {
        StudentModel.find()
          .then((data) => res.json(data))
          .catch((err) => console.log(err));
      } else {
        res.status(400).send(`Not Logged in!!`);
      }
    } else {
      res.status(400).send(`The UserName does not exist!!`);
    }
  },
  addStudent: (req, res) => {
    const newStudent = new StudentModel({
      name: req.body.name,
      dob: req.body.dob,
      school: req.body.school,
      class: req.body.class,
      division: req.body.division,
      status: req.body.status === "Active" ? true : false,
    });
    newStudent
      .save()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  delete: (req, res) => {
    StudentModel.findByIdAndDelete(req.params.id)
      .then((data) => res.send(`deleted`))
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  },
  updateStudent: (req, res) => {
    StudentModel.findByIdAndUpdate(req.body._id, {
      ...req.body,
      status: req.body.status === "Active" ? true : false,
    })
      .then((data) => res.status(201).send(data))
      .catch((err) => res.status(400).send(err));
  },
};
