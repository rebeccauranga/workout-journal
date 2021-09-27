import express, { Request, Response } from "express";
import { Exercise } from "../../shared/models";
import { listExercises } from "./db/db";

const app = express();
const port = 3000;

app.get("/", (_: Request, res: Response) => {
  res.send("hello world");
});

app.get("/api/exercises", async (_: Request, res: Response<Exercise[]>) => {
  const exercises = await listExercises();
  res.json(exercises);
});

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
