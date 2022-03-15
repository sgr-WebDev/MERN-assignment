const UserModel = require("../model/user");

module.exports = {
  addAccount: async (req, res) => {
    const check = await UserModel.findOne({ userName: req.body.eMail });
    if (check === null) {
      const newAccount = new UserModel({
        userName: req.body.eMail,
        password: req.body.password,
      });
      newAccount
        .save()
        .then((data) => {
          res.status(200).send(`The New Account is created!!`);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    } else {
      res.send(`The UserName already exists!!`);
    }
  },
  login: async (req, res) => {
    const user = await UserModel.findOne({ userName: req.body.eMail });
    if (user !== null) {
      if (user.password === req.body.password) {
        UserModel.findByIdAndUpdate(user._id, { status: true }).catch((err) =>
          res.status(400).send(err)
        );
        res.status(201).send(user);
      } else {
        res.status(200).send(`Wrong Password or UserName!!`);
      }
    } else {
      res.status(200).send(`No such UserName exist!!`);
    }
  },
};
