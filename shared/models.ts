export enum ExerciseCategory {
  LowerBody = "Lower Body",
  UpperBody = "Upper Body",
  Cardio = "Cardio",
}

export interface Exercise {
  id: string;
  category: ExerciseCategory;
  name: string;
  description: string;
  video_url: string;
}

export interface ExerciseConfiguration {
  exercise: Exercise;
  sets: number;
  reps: number;
  durationMinutes: number;
}

export interface CreateWorkoutRequest {
  name: string;
  exercises: ExerciseConfiguration[];
}

export interface Workout {
  id: string;
  name: string;
  favorite: boolean;
  user_id: string;
  created_at: Date;
}

export interface WorkoutExercise {
  workout_id: string;
  exercise_id: string;
  sets?: number;
  reps?: number;
  duration_minutes?: number;
  created_at: Date;
}

export interface WorkoutSession {
  id: string;
  workout_id: string;
  user_id: string;
  created_at: Date;
  completed_at: Date;
}

export interface WorkoutSessionExercise {
  session_id: string;
  exercise_id: string;
  created_at: Date;
  completed_at?: Date; // is this completed or not?
}

export interface WorkoutSessionDetailsResponse {
  data?: {
    session: WorkoutSession,
    workout: Workout,
    exerciseConfigs: WorkoutExercise[],
    exerciseStatuses: WorkoutSessionExercise[],
  };
  error?: string;
}

export interface WorkoutDetail extends Workout{
  exercises: WorkoutExercise[];
}

export interface User {
  email: string;
  id: string;
  photo_url: string;
  created_at: Date;
}
