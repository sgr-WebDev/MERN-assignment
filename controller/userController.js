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

  //     addDraft: async (req, res)=>{
  //         const obj = await NumberModel.findById("61fc30deb5c41217d01f0ea4");
  //         const draftNO = obj.draft.n;
  //         NumberModel.findByIdAndUpdate("61fc30deb5c41217d01f0ea4", {$set:{draft:{n:draftNO+1}}});
  //         // *saving invoice data to database.....
  //         const todaysdate = new Date().toLocaleDateString();
  //         const dta = req.body;
  //         const newDraft= new DraftModel({
  //             draftNo: draftNO,
  //             name:dta.name,
  //             phNo:dta.phNo,
  //             address:dta.address,
  //             plumber: dta.plumber,
  //             plumberNo: dta.plumberNo,
  //             totalAmount:Number(dta.totalAmount),
  //             totalMrp:Number(dta.totalMrp),
  //             profit:Number(dta.profit),
  //             savings:Number(dta.savings),
  //             discount:Number(dta.discount),
  //             payment: dta.payment,
  //             advPayment: Number(dta.advPayment),
  //             shipping: Number(dta.shipping),
  //             date: todaysdate,
  //             invoice: dta.invoice
  //           });
  //           newDraft.save()
  //           .then((data)=>{
  //             res.status(200).send(data);
  //           })
  //           .catch(err=>{
  //             console.log(err);
  //             res.status(400).json(err)
  //           });
  //     },
  //     deletedraft: (req, res)=>{
  //       DraftModel.findByIdAndDelete(req.body._id, (req,res,err)=>{
  //         if(!err){
  //           console.log(`deleted`)
  //         }else{console.log(err)}
  //       })
  //     }
};
