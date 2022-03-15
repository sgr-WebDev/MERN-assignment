const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const studentController = require("../controller/studentController");

router.post("/addAccount", userController.addAccount);
router.post("/login", userController.login);
router.post("/allStudents", studentController.allStudents);
router.post("/addStudent", studentController.addStudent);
router.delete("/delete/:id", studentController.delete);
router.put("/updateStudent", studentController.updateStudent);

module.exports = router;
