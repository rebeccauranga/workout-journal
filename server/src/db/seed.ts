import { v4 as uuidv4 } from "uuid";
import { Exercise, ExerciseCategory } from "../../../shared/models";
import { createExercise, findExerciseByName } from "./exercises";

const exercises: Exercise[] = [
  {
    id: uuidv4(),
    category: ExerciseCategory.LowerBody,
    name: "Squats",
    description:
      "A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up. During the descent of a squat, the hip and knee joints flex while the ankle joint dorsiflexes; conversely the hip and knee joints extend and the ankle joint plantarflexes when standing up.",
    video_url: "https://youtu.be/U3HlEF_E9fo",
  },
  {
    id: uuidv4(),
    category: ExerciseCategory.LowerBody,
    name: "Barbell deadlifts",
    description:
      "The deadlift is a weight training exercise in which a loaded barbell or bar is lifted off the ground to the level of the hips, torso perpendicular to the floor, before being placed back on the ground. It is one of the three powerlifting exercises, along with the squat and bench press.",
    video_url: "https://youtu.be/tNn7AlPITOw",
  },
  {
    id: uuidv4(),
    category: ExerciseCategory.LowerBody,
    name: "Barbell hip thrusts",
    description:
      "A barbell hip thrust is a lower-body strength training exercise defined by lifting your lower back and torso with your knees bent and your upper body resting on a bench. With proper form, the barbell hip thrust works muscle groups across your entire lower body, particularly the gluteal muscles.",
    video_url: "https://youtu.be/LM8XHLYJoYs",
  },
  {
    id: uuidv4(),
    category: ExerciseCategory.LowerBody,
    name: "Bulgarian split squats",
    description:
      "A type of single-leg squat, the Bulgarian split squat is sure to deliver big benefits to your lower body. With one leg behind you and elevated off of the ground, this exercise targets many of the same muscles as a traditional squat, but with an emphasis on the quads.",
    video_url: "https://youtu.be/2C-uNgKwPLE",
  },
  {
    id: uuidv4(),
    category: ExerciseCategory.LowerBody,
    name: "Lunges",
    description:
      "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
    video_url: "https://youtu.be/U3HlEF_E9fo",
  },
  {
    id: uuidv4(),
    category: ExerciseCategory.LowerBody,
    name: "Curtsy lunges",
    description:
      "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
    video_url: "https://youtu.be/U3HlEF_E9fo",
  },
  {
    id: uuidv4(),
    category: ExerciseCategory.LowerBody,
    name: "Dumbbell Romanian Deadlifts",
    description:
      "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
    video_url: "https://youtu.be/U3HlEF_E9fo",
  },
  {
    id: uuidv4(),
    category: ExerciseCategory.LowerBody,
    name: "Leg extension",
    description:
      "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
    video_url: "https://youtu.be/U3HlEF_E9fo",
  },
  {
    id: uuidv4(),
    category: ExerciseCategory.UpperBody,
    name: "Rows",
    description:
      "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
    video_url: "https://youtu.be/U3HlEF_E9fo",
  },
  {
    id: uuidv4(),
    category: ExerciseCategory.UpperBody,
    name: "Bicep curls",
    description:
      "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
    video_url: "https://youtu.be/U3HlEF_E9fo",
  },
  {
    id: uuidv4(),
    category: ExerciseCategory.UpperBody,
    name: "Lat pulldowns",
    description:
      "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
    video_url: "https://youtu.be/U3HlEF_E9fo",
  },
  {
    id: uuidv4(),
    category: ExerciseCategory.UpperBody,
    name: "Shoulder press",
    description:
      "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
    video_url: "https://youtu.be/U3HlEF_E9fo",
  },
  {
    id: uuidv4(),
    category: ExerciseCategory.UpperBody,
    name: "Chest press",
    description:
      "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
    video_url: "https://youtu.be/U3HlEF_E9fo",
  },
  {
    id: uuidv4(),
    category: ExerciseCategory.Cardio,
    name: "Running",
    description:
      "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
    video_url: "https://youtu.be/U3HlEF_E9fo",
  },
  {
    id: uuidv4(),
    category: ExerciseCategory.Cardio,
    name: "Walking",
    description:
      "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
    video_url: "https://youtu.be/U3HlEF_E9fo",
  },
  {
    id: uuidv4(),
    category: ExerciseCategory.Cardio,
    name: "Elliptical",
    description:
      "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
    video_url: "https://youtu.be/U3HlEF_E9fo",
  },
  {
    id: uuidv4(),
    category: ExerciseCategory.Cardio,
    name: "Bullshit",
    description:
      "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
    video_url: "https://youtu.be/U3HlEF_E9fo",
  },
];

function seedExercises(exercises: Exercise[]) {
  exercises.forEach(async (exercise) => {
    if (!(await findExerciseByName(exercise.name))) {
      await createExercise(exercise);
    }
  });
}

seedExercises(exercises);
