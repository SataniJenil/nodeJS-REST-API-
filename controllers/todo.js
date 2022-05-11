const Todo = require("../models/todo");
const { infoLogger, errorLogger } = require("../logger");
exports.findData = async function (req, res) {
  try {
    infoLogger.info(req.params);
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
    infoLogger.info(req.params);
    const data = await Todo.findById(req.params.id);
    if (!data) throw new Error("id is not found");
    else
      return res.json({
        success: true,
        message: "get details Successfully",
        data,
      });
  } catch (err) {
    errorLogger.error(err.message);
    res.json({ success: false, message: err.message });
  }
};

exports.addData = async function (req, res) {
  try {
    infoLogger.info(req.user, req.body);
    const createData = { ...req.body, user_id: req.user._id };
    await Todo.create(createData);
    res.json({
      success: true,
      message: "Todo Data add is success",
      createData,
    });
  } catch (err) {
    errorLogger.error(err.message);
    res.json({ success: false, message: err.message });
  }
};

exports.updateData = async function (req, res) {
  try {
    infoLogger.info(req.params, req.body);
    const data = await Todo.findByIdAndUpdate(req.params.id, req.body);
    if (!data) throw new Error("id is not found");
    res.json({ success: true, message: "todo data is update", data });
  } catch (err) {
    errorLogger.error(err.message);
    res.json({ success: false, message: err.message });
  }
};

exports.deleteData = async function (req, res) {
  try {
    infoLogger.info(req.params);
    const id = await Todo.findByIdAndDelete(req.params.id);
    if (!id) throw new Error("id is not found");
    res
      .status(200)
      .json({ success: true, message: "id delete id success", id });
  } catch (err) {
    errorLogger.error(err.message);
    res.json({ success: false, message: err.message });
  }
};
