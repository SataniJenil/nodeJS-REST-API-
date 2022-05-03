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
    console.log("error", value);
    let createData = new Todo(value);
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
    const user = await Todo.findById(req.params.id);
    console.log(user, "boom");
    if (!user) throw new Error("id is not found");
    let value = await updateSchema.validateAsync(req.body);
    console.log("error", value);
    const data = await Todo.findByIdAndUpdate(req.params.id, value);
    console.log(data);
    res.json({ success: true, message: "todo data is update", data });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

exports.deleteData = async function (req, res) {
  try {
    const data = await Todo.findById(req.params.id);
    console.log(data, "data");
    if (!data) throw new Error("id is not found");
    const id = await Todo.findByIdAndDelete(req.params.id);
    console.log(id, "user");
    res
      .status(200)
      .json({ success: true, message: "id delete id success", id });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
