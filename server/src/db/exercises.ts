import { v4 as uuidv4 } from "uuid";
import { Exercise } from "shared/models";
import pool from "server/db/config";

export async function createExercise(exercise: Exercise): Promise<Exercise> {
  const sql =
    "INSERT INTO exercises(id, category, name, description, video_url) VALUES($1, $2, $3, $4, $5) RETURNING *";
  const values = [
    uuidv4(),
    exercise.category,
    exercise.name,
    exercise.description,
    exercise.video_url,
  ];
  const res = await pool.query(sql, values);
  return res.rows[0];
}

export async function findExerciseByName(name: string): Promise<Exercise> {
  const sql =
    "SELECT id, category, name, description, video_url FROM exercises WHERE name = $1";
  const values = [name];
  const res = await pool.query(sql, values);
  return res.rows[0];
}
