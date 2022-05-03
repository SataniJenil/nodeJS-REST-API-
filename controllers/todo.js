const Todo = require("../models/todo");
const { todoSchema, updateSchema } = require("../middleware/joi");

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
    const data = await Todo.findById(req.params.id);
    if (!data) throw new Error("id is not found");
    else
      return res.json({
        success: true,
        message: "get details Successfully",
        data,
      });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

exports.addData = async function (req, res) {
  try {
    let value = await todoSchema.validateAsync(req.body);
    let createData = new Todo(value);
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
    const user = await Todo.findById(req.params.id);
    if (!user) throw new Error("id is not found");
    let value = await updateSchema.validateAsync(req.body);
    const data = await Todo.findByIdAndUpdate(req.params.id, value);
    res.json({ success: true, message: "todo data is update", data });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

exports.deleteData = async function (req, res) {
  try {
    const data = await Todo.findById(req.params.id);
    if (!data) throw new Error("id is not found");
    const id = await Todo.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "id delete id success", id });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
