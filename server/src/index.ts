import express from "express";
const app = express();
const port = 3000;
import { listExercises } from "./db/db";

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/exercises", async (req, res) => {
  const exercises = await listExercises();
  res.json(exercises);
});

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
