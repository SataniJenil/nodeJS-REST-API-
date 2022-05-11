const Task = require("../models/user");
var jwt = require("jsonwebtoken");
require("dotenv").config();
var secret = process.env.SECRET;
const Todo = require("../models/todo");
const mongoose = require("mongoose");
const { infoLogger, errorLogger } = require("../logger");
const fs = require("fs");
const path = require("path");
const __basedir = path.resolve();
const csv = require("csv-parser");
const fastCsv = require("fast-csv");
const employee = require("../models/employee");

exports.findData = async function (req, res) {
  try {
    infoLogger.info(req.params);
    const user = await Task.findById(req.params.id);
    if (!user) throw new Error("id is not found");
    res.json({
      success: true,
      message: "get details Successfully",
      user,
    });
  } catch (err) {
    errorLogger.error(err.message);
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
    infoLogger.info(user);
    res.json({
      success: true,
      message: "get Successfully",
      user,
    });
  } catch (err) {
    errorLogger.error(err.message);
    res.json({ success: false, message: err.message });
  }
};

exports.matchId = async function (req, res) {
  try {
    infoLogger.info(req.body);
    const user = await Task.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(req.body.id) },
      },
    ]);

    res.json({
      success: true,
      message: "get Successfully",
      user,
    });
  } catch (err) {
    errorLogger.error(err.message);
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
    infoLogger.info(user);

    res.json({
      success: true,
      message: "get Successfully",
      data: user,
    });
  } catch (err) {
    errorLogger.error(err.message);
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
    infoLogger.info(data);

    res.json({ success: true, message: "done", data });
  } catch (error) {
    errorLogger.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

exports.newData = async (req, res) => {
  try {
    infoLogger.info(req.body);
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
    errorLogger.error(error.message);
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
    infoLogger.info(user);
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
    infoLogger.info(req.body);
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
    errorLogger.error(err.message);
    res.json({ success: false, message: err.message });
  }
};

exports.registerData = async function (req, res) {
  try {
    infoLogger.info(req.body);

    let emailExist = await Task.findOne({ email: req.body.email });
    if (emailExist) throw new Error("Email already exist");
    let createData = await Task.create(req.body);
    res.send({ success: true, message: "register is done", createData });
  } catch (err) {
    errorLogger.error(err.message);

    res.json({ success: false, message: err.message });
  }
};

exports.csvController = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }
    const options = {
      objectMode: true,
      delimiter: ",",
      quote: null,
      headers: true,
      renameHeaders: false,
    };
    const readableStream = fs.createReadStream(
      __basedir + "/imageStore/" + req.file.filename
    );
    let Tutorial = [];

    // let path = __basedir + "/imageStore/" + req.file.filename;
    // console.log("path", path);

    fastCsv
      .parseStream(readableStream, options)
      .on("error", (error) => {
        console.log(error);
      })
      .on("data", (row) => {
        Tutorial.push(row);
      })
      .on("end", (rowCount) => {
        console.log(rowCount);
        console.log(Tutorial);
        employee.insertMany(Tutorial);
      });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

exports.updateData = async function (req, res) {
  try {
    infoLogger.info(req.params, req.body);
    const data = await Task.findByIdAndUpdate(req.params.id, req.body);
    if (!data) throw new Error("id is not found");
    res.json({ success: true, message: "todo data is update", data });
  } catch (err) {
    errorLogger.error(err.message);
    res.json({ success: false, message: err.message });
  }
};

exports.deleteData = async function (req, res) {
  try {
    let id = req.params.id ? undefined : "";
    if (!id) throw new Error("Enter A valid ID");
    console.log("id", id);
    infoLogger.info(req.params);
    const data = await Task.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "id delete id success", data });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.combineData = async function (req, res) {
  const id = req.body.id;
  try {
    infoLogger.info(id, req.body);
    if (id) {
      const data = await Task.findByIdAndUpdate(id, req.body);
      res.json({ success: true, message: "user data is update", data });
    } else {
      let createData = await Task.create(req.body);
      res.send({ success: true, message: "register is done", createData });
    }
  } catch (error) {
    errorLogger.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

exports.twoData = async function (req, res) {
  try {
    infoLogger.info(req.query);
    let data = {};
    if (req.query.username) {
      data = { ...data, username: req.query.username };
    }
    if (req.query.email) {
      data = { ...data, email: req.query.email };
    }
    if (req.query.mobilenumber) {
      data = { ...data, mobilenumber: req.query.mobilenumber };
    }
    if (req.query.password) {
      data = { ...data, password: req.query.password };
    }
    const all = await Task.find(data);
    res.json({ success: true, message: "data is get", all });
  } catch (error) {
    errorLogger.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
