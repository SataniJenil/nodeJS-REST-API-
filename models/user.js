const mongoose = require("mongoose");
const dataSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  mobilenumber: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  Image: {
    type: String,
    require: true,
  },
  Image_url: {
    type: String,
  },
});
const Task = mongoose.model("Task", dataSchema);
module.exports = Task;
