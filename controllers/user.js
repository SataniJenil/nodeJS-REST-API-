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
    res.json({ message: err.message });
  }
};

exports.updateData = async function (req, res) {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    console.log("user");
    res.json({ success: "true", message: "data is update" });
  } catch (error) {
    ({ success: "false", message: error.message });
  }
};

exports.deleteData = async function (req, res) {
  try {
    const user = await Task.findById(req.params.id);
    console.log(user, "boom");
    if (!user) throw new Error("id is not found");
    const data = await Task.findByIdAndDelete(req.params.id);
    console.log("data", data);
    res
      .status(200)
      .json({ success: true, message: "id delete id success", data: data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
};
