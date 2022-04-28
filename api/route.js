const express = require("express");
const app = express();
const router = express.Router();
const {
  findData,
  loginData,
  registerData,
  updateData,
  deleteData,
} = require("../controllers/user");

router.get("/", findData);

router.post("/login", loginData);

router.post("/register", registerData);

router.put("/user/:id", updateData);

router.delete("/delete/:id", deleteData);

module.exports = router;
