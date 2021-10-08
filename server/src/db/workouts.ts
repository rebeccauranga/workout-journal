import { v4 as uuidv4 } from "uuid";
import {
  ExerciseConfiguration,
  CreateWorkoutRequest,
} from "../../../shared/models";
import pool from "./config";
import { InvalidArgumentError } from "../errors";


export async function createWorkout(
  createWorkoutRequest: CreateWorkoutRequest,
  userId: string
): Promise<void> {
  const id = await findWorkoutByName(createWorkoutRequest.name, userId);
  if (id) {
    throw new InvalidArgumentError(`Workout "${createWorkoutRequest.name}" already exists`);
  };

  try {
    await pool.query("BEGIN");
    const workoutId = await insertWorkout(createWorkoutRequest.name, userId);
    const pending = createWorkoutRequest.exercises.map(async (exercise) => {
      await insertWorkoutExercise(workoutId, exercise);
    });
    await Promise.all(pending);
    await pool.query("COMMIT");
  } catch (e) {
    await pool.query("ROLLBACK");
    throw e;
  }
}

async function insertWorkout(name: string, userId: string): Promise<string> {
  const sql = "INSERT INTO workouts(id, name, user_id) VALUES($1, $2, $3)";
  const uuid = uuidv4();
  const values = [uuid, name, userId];
  await pool.query(sql, values);
  return uuid;
}

async function insertWorkoutExercise(
  workoutId: string,
  exerciseConfiguration: ExerciseConfiguration
): Promise<void> {
  const sql = `
    INSERT INTO 
        workout_exercises(workout_id, exercise_id, sets, reps, duration_minutes) 
    VALUES($1, $2, $3, $4, $5)`;
  const values = [
    workoutId,
    exerciseConfiguration.exercise.id,
    exerciseConfiguration.sets,
    exerciseConfiguration.reps,
    exerciseConfiguration.durationMinutes,
  ];
  await pool.query(sql, values);
}

// findWorkoutByName checks if a workout already exists with `name`
// for user `userId`.
async function findWorkoutByName(
  name: string,
  userId: string
): Promise<string> {
  const sql = "SELECT id FROM workouts WHERE name = $1 AND user_id = $2";
  const values = [name, userId];
  const res = await pool.query(sql, values);
  return res.rows[0];
}
