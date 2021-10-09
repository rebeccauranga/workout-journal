import pool from "./config";

const exercisesDDL = `
    CREATE TABLE IF NOT EXISTS exercises (
        id UUID PRIMARY KEY,
        category VARCHAR(50),
        name VARCHAR(50) UNIQUE,
        description TEXT,
        video_url VARCHAR(255)
    );
`;

const usersDDL = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      email VARCHAR(50) UNIQUE NOT NULL,
      photo_url TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
`;

const workoutsDDL = `
    CREATE TABLE IF NOT EXISTS workouts (
      id UUID PRIMARY KEY NOT NULL,
      name VARCHAR(100) NOT NULL,
      favorite BOOLEAN DEFAULT FALSE,
      user_id UUID NOT NULL REFERENCES users(id),
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(name, user_id)
    );
`;

const workoutExercisesDDL = `
    CREATE TABLE IF NOT EXISTS workout_exercises (
      workout_id UUID NOT NULL REFERENCES workouts(id),
      exercise_id UUID NOT NULL REFERENCES exercises(id),
      sets INTEGER,
      reps INTEGER,
      duration_minutes INTEGER,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY(workout_id, exercise_id)
    );
`;

const schema = [usersDDL, workoutsDDL, exercisesDDL, workoutExercisesDDL];
(async () => {
  for await (let ddl of schema) {
    await pool.query(ddl);
  }
})();
