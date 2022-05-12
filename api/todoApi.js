import express from "express";
const router = express.Router();
import auth from "../middleware/auth";
import { todoAddSchema, updateSchema } from "../middleware/joi";

import {
  findUser,
  addData,
  updateData,
  deleteData,
  findData,
} from "../controllers/todo";

router.get("/get", auth, findData);

router.get("/oneId/:id", auth, findUser);

router.post("/create", auth, todoAddSchema, addData);

router.put("/:id", auth, updateSchema, updateData);

router.delete("/:id", auth, deleteData);

export default router;
