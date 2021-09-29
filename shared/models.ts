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
}

export interface User {
  email: string;
  id: string;
  photo_url: string;
  created_at: Date;
}
