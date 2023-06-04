import express from "express";
import {
  addStudent,
  deleteStudent,
  getAllStudents,
  getStudent,
  updateStudent,
} from "../controllers/students.js";

const router = express.Router();

router.route("/").get(getAllStudents).post(addStudent);

router.route("/:id").get(getStudent).put(updateStudent).delete(deleteStudent);

export default router;
