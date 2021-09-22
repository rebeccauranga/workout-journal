import express, { Request, Response, NextFunction } from "express";
import { Exercise } from "../../shared/models";
import { listExercises } from "./db/db";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/exercises", async (req: Request, res: Response<Exercise[]>, next: NextFunction) => {
  const exercises = await listExercises();
  res.json(exercises);
});

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
