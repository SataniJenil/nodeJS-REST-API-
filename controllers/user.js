const Task = require("../models/user");
var jwt = require("jsonwebtoken");
var secret = "mouse";
const mongoose = require("mongoose");
exports.findData = async function (req, res) {
  try {
    const user = await Task.find({});
    res.json({
      success: true,
      message: "get details Successfully",
      data: user,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.loginData = async function (req, res) {
  try {
    const user = await Task.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        success: false,
        message: "user is not found",
      });
    } else
      var token = jwt.sign({ email: user.email }, secret, {
        expiresIn: "1h",
      });
    res.json({ success: true, message: "token is generate", token: token });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

exports.registerData = async function (req, res) {
  try {
    const valid = new Task(req.body);
    let emailExist = await Task.findOne({ email: req.body.email });
    if (emailExist) throw new Error("Email already exist");
    let createData = await Task.create(valid);
    createData && res.send({ success: true, message: "register is done" });
  } catch (err) {
    res.json(err.message);
  }
};

exports.updateData = async function (req, res) {
  await Task.findByIdAndUpdate(req.params.id, req.body);
  console.log("user");
  let err;
  if (err) throw new Error("data is not update");
  else res.json({ success: "true", message: "data is update" });
};

exports.deleteData = async function (req, res) {
  try {
    // var query = { users: mongoose.Types.ObjectId(req.params.user_id) };
    // console.log("query", query);
    const user = await Task.findById(req.params.id);
    console.log(user, "boom");
    if (!user) throw new Error("id is not found");
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "id delete id success" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
};
