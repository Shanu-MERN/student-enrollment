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
    res.json(data);
  } catch (error) {
    res.status(500).send(`No student with id ${req.params.id} found`);
  }
};

const addStudent = (req, res) => {
  const requiredFields = ["name", "enrolledDepartment", "enrollmentDate"];
  let errorMessage = "Missing required field(s): ";
  for (const field of requiredFields) {
    if (!req.body[field]) {
      errorMessage += `${field} `;
    }
  }
  if (errorMessage !== "Missing required field(s): ") {
    return res.status(400).send(errorMessage);
  }

  const newStudent = new Student(req.body);
  try {
    newStudent.save();
    res.json(newStudent);
  } catch (error) {
    res.status(500).json(`Error adding student to database: ${error.message}`);
  }
};

const updateStudent = async (req, res) => {
  const id = req.params.id;
  const { name, enrolledDepartment, enrollmentDate } = req.body;
  var student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(404).send(`No student with id ${id} found`);
  }
  student.name = name;
  student.enrolledDepartment = enrolledDepartment;
  student.enrollmentDate = enrollmentDate;
  await student.save();
  return res.json(student);
};

const deleteStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    return res.json(deletedStudent);
  } catch (error) {
    return res.status(500).send(`No student with id ${id} found`);
  }
};

export { getAllStudents, getStudent, addStudent, updateStudent, deleteStudent };
