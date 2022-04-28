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
    console.log(err);
  }
};

exports.findId = async function (req, res) {
  try {
    const user = await Todo.findOne({});
    res.json({
      success: true,
      message: "get details Successfully",
      data: user,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.addData = async function (req, res) {
  try {
    const todo = await new Todo(req.body);
    let createData = new Todo(todo);
    console.log("createData", createData);
    createData.save();
    res.json({
      success: true,
      message: "Todo Data add is success",
      data: todo,
    });
  } catch (err) {
    return res.json({ error: err });
  }
};

exports.updateData = async function (req, res) {
  try {
    const data = await Todo.findByIdAndUpdate(req.params.id, req.body);
    console.log(data);
    res.json({ success: true, message: "todo data is update", data: data });
  } catch (err) {
    res.json(err);
    console.log("err", err);
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
    res.json(err);
  }
};
