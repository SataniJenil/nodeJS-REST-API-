import Task from "../models/user";
import jwt from "jsonwebtoken";
require("dotenv").config();
import Todo from "../models/todo";
import mongoose from "mongoose";
import { infoLogger, errorLogger } from "../logger";
import fs from "fs";
import path from "path";
const __basedir = path.resolve();
import csv from "csv-parser";
import employee from "../models/employee";
import nodemailer from "nodemailer";
import generator from "generate-password";
require("dotenv").config();
let email = process.env.EMAIL;
let pw = process.env.PASS;
var secret = process.env.SECRET;
import upload from "../middleware/upload";

const findData = async (req, res) => {
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

const projectId = async (req, res) => {
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

const matchId = async (req, res) => {
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

const addFields = async (req, res) => {
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

const multipleData = async (req, res) => {
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

const newData = async (req, res) => {
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

const size = async (req, res) => {
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

const loginData = async (req, res) => {
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

const registerData = async (req, res) => {
  try {
    infoLogger.info(req.body);
    let emailExist = await Task.findOne({ email: req.body.email });
    if (emailExist) throw new Error("Email already exist");
    var password = generator.generate({
      length: 10,
      numbers: true,
    });
    console.log("password", password);
    let createData = await Task.create({ ...req.body, password });

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: email,
        pass: pw,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    console.log("transporter", transporter);
    let mailOptions = {
      from: email,
      to: req.body.email,
      subject: "password verification mail",
      html: `<p>use this password for signup"<br/>  ${password} </p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      res.render("contact", { msg: "Email has been sent" });
    });
    res.send({ success: true, message: "register is done", createData });
  } catch (err) {
    errorLogger.error(err.message);

    res.json({ success: false, message: err.message });
  }
};

const csvController = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    const readableStream = __basedir + "/imageStore/" + req.file.filename;
    let Tutorial = [];

    fs.createReadStream(readableStream)
      .pipe(csv())
      .on("error", (error) => {
        console.log(error);
      })
      .on("data", (row) => {
        Tutorial.push(row);
      })
      .on("end", () => {
        employee.insertMany(Tutorial);
        console.log("hie");
        fs.unlink(readableStream, function (err) {
          if (err) throw err;
          console.log("file deleted");
        });
      });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const imageUpload = async (req, res) => {
  upload(req, res, async function (err, data) {
    try {
      console.log("err", err);
      console.log("data", data);
      let user = await Task.create({ ...req.body, Image: req.file.filename });
      res.status(200).json({ success: true, message: "file is upload ", user });
    } catch (error) {
      res
        .status(401)
        .json({ success: false, message: "Enter a Right details" });
    }
  });
};

const updateData = async (req, res) => {
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

const deleteData = async (req, res) => {
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

const combineData = async (req, res) => {
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

const twoData = async (req, res) => {
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

export {
  findData,
  projectId,
  matchId,
  addFields,
  multipleData,
  newData,
  size,
  loginData,
  registerData,
  csvController,
  imageUpload,
  updateData,
  deleteData,
  combineData,
  twoData,
};
