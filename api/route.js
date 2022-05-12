import express from "express";
const router = express.Router();
import {
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
  imageUpload,
  nodeMailer,
} from "../controllers/user";
import {
  registrationSchema,
  updateRegistrationSchema,
  combineSchema,
  combineRegistrationSchema,
} from "../middleware/joi";
import auth from "../middleware/auth";
import upload from "../middleware/upload";

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

router.post("/image", imageUpload);

router.post("/combine", auth, combineSchema, combineData);

router.put("/user/:id", auth, updateRegistrationSchema, updateData);

router.delete("/delete/:id", auth, deleteData);

router.get("/:id", auth, findData);

export default router;
