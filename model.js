const mongoose = require("mongoose");
const dataSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  mobilenumber: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});
const Task = mongoose.model("Task", dataSchema);
module.exports = Task;
