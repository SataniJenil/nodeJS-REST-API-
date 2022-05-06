const Task = require("../models/user");
var jwt = require("jsonwebtoken");
var secret = "mouse";
const Todo = require("../models/todo");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const validation = require("../middleware/validation");

exports.findData = async function (req, res) {
  try {
    const user = await Task.findById(req.params.id);
    res.json({
      success: true,
      message: "get details Successfully",
      data: user,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

exports.projectId = async function (req, res) {
  try {
    const user = await Task.aggregate([
      {
        $project: { username: 1, email: 1 },
      },
    ]);
    res.json({
      success: true,
      message: "get Successfully",
      data: user,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

exports.matchId = async function (req, res) {
  try {
    const user = await Task.aggregate([
      {
        $match: { username: req.body.username },
      },
    ]);

    res.json({
      success: true,
      message: "get Successfully",
      data: user,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

exports.addFields = async function (req, res) {
  try {
    const user = await Task.aggregate([
      {
        $addFields: {
          username: "Ok",
        },
      },
    ]);
    res.json({
      success: true,
      message: "get Successfully",
      data: user,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

exports.multipleData = async (req, res) => {
  try {
    const data = await Todo.aggregate([
      {
        $lookup: {
          from: "tasks",
          localField: "user_id",
          foreignField: "_id",
          as: "Todo_info",
        },
      },
    ]);
    res.json({ success: true, message: "done", data });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

exports.newData = async (req, res) => {
  try {
    const data = await Task.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.body.id),
        },
      },
      {
        $lookup: {
          from: "todos",
          localField: "_id",
          foreignField: "user_id",
          as: "TodoData",
        },
      },
      {
        $addFields: {
          TotalData: { $size: { $ifNull: ["$TodoData", []] } },
        },
      },
    ]);
    res.json({ success: true, message: "done", data });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

exports.size = async function (req, res) {
  try {
    const user = await Task.aggregate([
      {
        $project: {
          mobilenumber: 1,
          numberOfmobilenumber: {
            $cond: {
              if: { $isArray: "$mobilenumber" },
              then: { $size: "$mobilenumber" },
              else: "NA",
            },
          },
        },
      },
    ]);
    res.json({
      success: true,
      message: "get Successfully",
      data: user,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
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
      var token = jwt.sign({ email: user.email, _id: user._id }, secret, {
        expiresIn: "1h",
      });
    res.json({ success: true, message: "token is generate", token: token });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

exports.registerData = async function (req, res) {
  try {
    let emailExist = await Task.findOne({ email: req.body.email });
    if (emailExist) throw new Error("Email already exist");
    let createData = await Task.create(req.body);
    res.send({ success: true, message: "register is done", createData });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

exports.updateData = async function (req, res) {
  try {
    const data = await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true, message: "todo data is update", data });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

exports.deleteData = async function (req, res) {
  try {
    const data = await Task.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "id delete id success", data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.combineData = async function (req, res) {
  const id = req.body.id;
  try {
    if (id) {
      const data = await Task.findByIdAndUpdate(id, req.body);
      res.json({ success: true, message: "user data is update", data });
    } else {
      let createData = await Task.create(req.body);
      res.send({ success: true, message: "register is done", createData });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

exports.twoData = async function (req, res) {
  try {
    const user = await Task.findOne({
      username: req.body.username,
    });
    if (user) {
      res.json({
        success: true,
        message: "get details Successfully",
        user,
      });
    } else {
      const data = await Task.find({});
      res.json({
        success: true,
        message: "get details Successfully",
        data,
      });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
