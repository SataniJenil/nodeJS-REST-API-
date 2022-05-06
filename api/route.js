const express = require("express");
const app = express();
const router = express.Router();
const {
  findData,
  matchId,
  addFields,
  size,
  multipleData,
  newData,
  twoData,
  combineData,
  projectId,
  loginData,
  registerData,
  updateData,
  deleteData,
} = require("../controllers/user");
const {
  registrationSchema,
  updateRegistrationSchema,
  combineSchema,
  combineRegistrationSchema,
} = require("../middleware/joi");
const auth = require("../middleware/auth");

router.get("/:id", auth, findData);

router.get("/match", auth, matchId);

router.get("/project", auth, projectId);

router.get("/addFields", auth, addFields);

router.get("/size", auth, size);

router.get("/look", auth, multipleData);

router.get("/newLook", auth, newData);

router.get("/combineData", auth, twoData);

router.post("/login", loginData);

router.post("/combine", auth, combineSchema, combineData);

router.post("/register", registrationSchema, registerData);

router.put("/user/:id", auth, updateRegistrationSchema, updateData);

router.delete("/delete/:id", auth, deleteData);

module.exports = router;
