import express from "express";

import studentsRouter from "./routes/students.js";

const PORT = 3001;
const app = express();

app.use("/student", studentsRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
