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
  csvController,
} = require("../controllers/user");
const {
  registrationSchema,
  updateRegistrationSchema,
  combineSchema,
  combineRegistrationSchema,
} = require("../middleware/joi");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
router.get("/match", auth, matchId);

router.get("/project", auth, projectId);

router.get("/addFields", auth, addFields);

router.get("/size", auth, size);

router.get("/look", auth, multipleData);

router.get("/custom", auth, newData);

router.get("/combineData", auth, twoData);

router.post("/login", loginData);

router.post("/register", registrationSchema, registerData);

router.post("/upload", upload, csvController);

router.post("/combine", auth, combineSchema, combineData);

router.put("/user/:id", auth, updateRegistrationSchema, updateData);

router.delete("/delete/:id", auth, deleteData);

router.get("/:id", auth, findData);

module.exports = router;
