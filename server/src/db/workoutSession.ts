import { v4 as uuidv4 } from "uuid";
import pool from "./config";
import { WorkoutExercise, WorkoutSession } from "../../../shared/models";
import { listWorkoutExercises } from "./workouts";
import { InvalidArgumentError } from "../errors";

async function insertWorkoutSession(
  workoutId: string,
  userId: string
): Promise<WorkoutSession> {
  const sql =
    "INSERT INTO workout_sessions(id, workout_id, user_id) VALUES($1, $2, $3) RETURNING *";
  const values = [uuidv4(), workoutId, userId];
  const res = await pool.query(sql, values);
  return res.rows[0];
}

async function insertWorkoutSessionExercise(
  session: WorkoutSession,
  exercise: WorkoutExercise
) {
  const sql =
    "INSERT INTO workout_session_exercises(session_id, exercise_id) VALUES($1, $2) RETURNING *";
  const values = [session.id, exercise.exercise_id];
  const res = await pool.query(sql, values);
  return res.rows[0];
}

export async function createWorkoutSession(
  workoutId: string,
  userId: string
): Promise<string> {
  if (await getActiveWorkoutSession(userId)) {
    throw new InvalidArgumentError("Workout session already active");
  }

  try {
    await pool.query("BEGIN");
    const workoutSession = await insertWorkoutSession(workoutId, userId);
    const workoutExercises = await listWorkoutExercises(workoutId);
    for (let exercise of workoutExercises) {
      await insertWorkoutSessionExercise(workoutSession, exercise);
    }
    await pool.query("COMMIT");
    return workoutSession.id;
  } catch (e) {
    await pool.query("ROLLBACK");
    throw e;
  }
}

export async function getActiveWorkoutSession(
  userId: string
): Promise<WorkoutSession | null> {
  const sql =
    "SELECT id, workout_id, user_id, created_at, completed_at FROM workout_sessions WHERE user_id = $1 AND completed_at IS NULL";
  const values = [userId];
  const res = await pool.query(sql, values);
  return (res.rows && res.rows[0]) ? res.rows[0] : null;
}
