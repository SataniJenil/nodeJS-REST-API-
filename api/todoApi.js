const express = require("express");
const router = express.Router();
const {
  findUser,
  addData,
  updateData,
  deleteData,
  findData,
} = require("../controllers/todo");

router.get("/get", findData);

router.get("/oneId/:id", findUser);

router.post("/create", addData);

router.put("/:id", updateData);

router.delete("/:id", deleteData);

module.exports = router;
