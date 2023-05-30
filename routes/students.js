import express from "express";
import * as dotenv from "dotenv";
import mongoose, { model } from "mongoose";
import { StudentSchema } from "../models/students.js";

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
const router = express.Router();

mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
const Student = model("data", StudentSchema);
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

router.get("/", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

router.get("/:id", async (req, res) => {
  const data = await Student.findById(req.params.id);
  res.send(`Name of student with id ${req.params.id}: "${data.name}"`);
});

router.post("/", (req, res) => {
  const newStudent = new Student(req.body);
  console.log(newStudent);
  try {
    newStudent.save();
  } catch (error) {
    console.log(error);
  }
  res.send("Create a new student");
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const student = req.body;
  res.send(`Update student with id ${id}`);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Delete student with id ${id}`);
});

export default router;
