const express = require("express");
const app = express();
const router = express.Router();
const Task = require("./model");
var jwt = require("jsonwebtoken");
var secret = "mouse";
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

router.post("/login", async (req, res) => {
  Task.findOne({ email: req.body.email }).exec(function (err, user) {
    if (err) throw err;
    else {
      if (!user) {
        res.json({
          success: false,
          message: "user is not found",
        });
      } else {
        var token = jwt.sign({ email: user.email }, secret, {
          expiresIn: "1h",
        });
        res.json({ success: true, message: "token is generate", token: token });
      }
    }
  });
});

router.post("/register", async (req, res) => {
  try {
    const valid = new Task(req.body);
    let emailExist = await Task.findOne({ email: req.body.email });
    if (emailExist) throw new Error("Email already exist");
    let createData = await Task.create(valid);
    createData && res.send({ success: true, message: "register is done" });
  } catch (err) {
    res.json(err.message);
  }
});
router.put("/user/:id", async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, req.body);
  console.log("user");
  let err;
  if (err) throw new Error("data is not update");
  else res.json({ success: "true", message: "done" });
});

router.delete("/delete/:id", async (req, res) => {
  const user = await Task.findByIdAndDelete(req.params.id);
  console.log(user, "user");
  res
    .status(200)
    .json({ success: true, message: "id delete id success", data: user });
});

module.exports = router;
