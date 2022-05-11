const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { todoAddSchema, updateSchema } = require("../middleware/joi");

const {
  findUser,
  addData,
  updateData,
  deleteData,
  findData,
} = require("../controllers/todo");

router.get("/get", auth, findData);

router.get("/oneId/:id", auth, findUser);

router.post("/create", auth, todoAddSchema, addData);

router.put("/:id", auth, updateSchema, updateData);

router.delete("/:id", auth, deleteData);

module.exports = router;
