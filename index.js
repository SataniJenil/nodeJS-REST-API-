const express = require("express");
const app = express();
const mongoose = require("mongoose");
const api = require("./api/route");
const todo = require("./api/todoApi");
const bodyParser = require("body-parser");
const db = "mongodb://localhost:27017/task";
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

app.listen(8000, console.log("running"));
