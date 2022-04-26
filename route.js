const express = require("express");
const app = express();
const router = express.Router();
const Task = require("./model");

router.get("/", (req, res) => {
  console.log("work is complete");
  Task.find({}).exec(function (err, user) {
    if (err) throw err;
    else {
      res.json({
        success: true,
        message: "get details Successfully",
        data: user,
      });
    }
  });
});

router.post("/login", (req, res) => {
  Task.findOne(
    { email: req.body.email, password: req.body.password },
    function (err, user) {
      console.log("user", user);
      if (!user) {
        res.json({
          success: "false",
          message: "Email and Password are not provided",
        });
      } else res.json({ success: "true", message: "login successfully" });
    }
  );
});

router.post("/SingUp", async (req, res) => {
  let user = await new Task();
  console.log("user", user);
  user.username = req.body.username;
  user.email = req.body.email;
  user.mobilenumber = req.body.mobilenumber;
  user.password = req.body.password;
  user.save((err) => {
    if (err) {
      console.log(err);
    } else res.json({ success: "true", message: "register is done" });
  });
});

module.exports = router;
