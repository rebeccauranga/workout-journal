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

export interface WorkoutDetail extends Workout{
  exercises: WorkoutExercise[];
}

export interface User {
  email: string;
  id: string;
  photo_url: string;
  created_at: Date;
}
