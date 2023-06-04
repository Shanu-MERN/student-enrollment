import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { Student } from "../models/students.js";

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));

const getAllStudents = async (req, res) => {
  const data = await Student.find();
  res.json(data);
};

const getStudent = async (req, res) => {
  try {
    const data = await Student.findById(req.params.id);
    return res.json(data);
  } catch (error) {
    return res.status(500).send(`No student with id ${req.params.id} found`);
  }
};

const addStudent = async (req, res) => {
  const newStudent = new Student(req.body);
  try {
    await newStudent.save();
  } catch (error) {
    return res
      .status(500)
      .json(`Error adding student to database: ${error.message}`);
  }
  return res.json(newStudent);
};

const updateStudent = async (req, res) => {
  try {
    var student = await Student.findById(req.params.id);
  } catch (error) {
    return res.status(500).send(`No student with id ${req.params.id} found`);
  }
  for (const key in req.body) {
    if (req.body[key]) student[key] = req.body[key];
  }
  await student.save();
  return res.json(student);
};

const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    return res.json(deletedStudent);
  } catch (error) {
    return res.status(500).send(`No student with id ${req.params.id} found`);
  }
};

export { getAllStudents, getStudent, addStudent, updateStudent, deleteStudent };
