import { v4 as uuidv4 } from "uuid";
import {
  ExerciseConfiguration,
  CreateWorkoutRequest,
  Workout,
  WorkoutExercise,
  WorkoutDetail
} from "../../../shared/models";
import pool from "./config";
import { InvalidArgumentError } from "../errors";

export async function createWorkout(
  createWorkoutRequest: CreateWorkoutRequest,
  userId: string
): Promise<void> {
  const id = await findWorkoutByName(createWorkoutRequest.name, userId);
  if (id) {
    throw new InvalidArgumentError(
      `Workout "${createWorkoutRequest.name}" already exists`
    );
  }

  try {
    await pool.query("BEGIN");
    const workoutId = await insertWorkout(createWorkoutRequest.name, userId);
    for (let exercise of createWorkoutRequest.exercises) {
      await insertWorkoutExercise(workoutId, exercise);
    }
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

export async function listWorkouts(userId: string): Promise<Workout[]> {
  const sql = "SELECT id, name, favorite, user_id, created_at FROM workouts WHERE user_id = $1 ORDER BY created_at DESC";
  const values = [userId];
  const res = await pool.query(sql, values);
  return res.rows;
}

export async function listWorkoutExercises(workoutId: string): Promise<WorkoutExercise[]> {
  const sql = "SELECT workout_id, exercise_id, sets, reps, duration_minutes, created_at FROM workout_exercises WHERE workout_id = $1";
  const values = [workoutId];
  const res = await pool.query(sql, values);
  return res.rows;
}

export async function findWorkoutById(workoutId: string): Promise<Workout> {
  const sql = "SELECT id, name, favorite, user_id, created_at FROM workouts WHERE id = $1";
  const values = [workoutId];
  const res = await pool.query(sql, values);
  return res.rows[0];
}

export async function findWorkoutDetailById(workoutId: string): Promise<WorkoutDetail> {
  const workout = await findWorkoutById(workoutId);
  const exercises = await listWorkoutExercises(workoutId);
  const workoutDetail = {...workout, exercises};
  return workoutDetail;
}
