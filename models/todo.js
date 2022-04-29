const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
  Title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    required: false,
  },
});
const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
