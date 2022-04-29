const Todo = require("../models/todo");

exports.findData = async function (req, res) {
  try {
    const user = await Todo.find({});
    res.json({
      success: true,
      message: "get details Successfully",
      data: user,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

exports.findUser = async function (req, res) {
  try {
    const user = await Todo.findById(req.params.id);
    console.log(user, "users");
    res.json({
      success: true,
      message: "get details Successfully",
      data: user,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

exports.addData = async function (req, res) {
  try {
    let createData = new Todo(req.body);
    console.log("createData", createData);
    createData.save();
    res.json({
      success: true,
      message: "Todo Data add is success",
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

exports.updateData = async function (req, res) {
  try {
    const data = await Todo.findByIdAndUpdate(req.params.id, req.body);
    console.log(data);
    res.json({ success: true, message: "todo data is update", data: data });
  } catch (err) {
    res.json(err);
    res.json({ success: false, message: err.message });
  }
};
exports.deleteData = async function (req, res) {
  try {
    const id = await Todo.findByIdAndDelete(req.params.id);
    console.log(id, "user");
    res
      .status(200)
      .json({ success: true, message: "id delete id success", data: id });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
