import express from "express";
const app = express();
import mongoose from "mongoose";
import api from "./api/route";
import todo from "./api/todoApi";
import employee from "./models/employee";
import bodyParser from "body-parser";
require("dotenv").config();
let port = process.env.PORT;
let host = process.env.HOST;
const db = `mongodb://${host}`;
mongoose
  .connect(db)
  .then(() => {
    console.log(`connected successfully`);
  })
  .catch((err) => console.log(`not successfully`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", api);
app.use("/todo", todo);
app.use("/employee", employee);
app.use("/", express.static("imageStore"));

app.listen(port, () => {
  console.log(`Server is listen`, port, host);
});
