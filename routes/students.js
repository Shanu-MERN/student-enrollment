import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("List all students");
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Student with id ${id}`);
});

router.post("/", (req, res) => {
  const student = req.body;
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
