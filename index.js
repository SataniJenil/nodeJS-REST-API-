const express = require("express");
const app = express();
const mongoose = require("mongoose");
const api = require("./api/route");
const todo = require("./api/todoApi");
const employee = require("./models/employee");
const bodyParser = require("body-parser");
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
