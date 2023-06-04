import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  enrolledDepartment: {
    type: String,
    required: true,
  },
  enrollmentDate: {
    type: Date,
    required: true,
  },
});

export const Student = mongoose.model("data", StudentSchema);
