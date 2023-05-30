import mongoose from "mongoose";

export const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
