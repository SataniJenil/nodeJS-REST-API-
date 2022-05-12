import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  Title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});
const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
