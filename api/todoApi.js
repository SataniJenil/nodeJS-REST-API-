const express = require("express");
const router = express.Router();
const {
  findId,
  addData,
  updateData,
  deleteData,
  findData,
} = require("../controllers/todo");

router.get("/get", findData);

router.get("/", findId);

router.post("/create", addData);

router.put("/:id", updateData);

router.delete("/:id", deleteData);

module.exports = router;
