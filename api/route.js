const express = require("express");
const app = express();
const router = express.Router();
const {
  findData,
  matchId,
  addFields,
  size,
  lookData,
  newData,
  projectId,
  loginData,
  registerData,
  updateData,
  deleteData,
} = require("../controllers/user");

router.get("/", findData);

router.get("/match", matchId);

router.get("/project", projectId);

router.get("/addFields", addFields);

router.get("/size", size);

router.get("/look", lookData);

router.get("/newLook", newData);

router.post("/login", loginData);

router.post("/register", registerData);

router.put("/user/:id", updateData);

router.delete("/delete/:id", deleteData);

module.exports = router;
