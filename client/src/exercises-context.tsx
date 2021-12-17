import React, { useState, useEffect, createContext, useContext } from "react";
import { Exercise } from "../../shared/src/models";

interface ExerciseData {
  exercises: Exercise[];
  exercisesById: Map<string, Exercise>;
}

const useProvideExercises = (): ExerciseData => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  async function getExercises() {
    const url = "/api/exercises";
    const response = await fetch(url);
    if (response.status === 200) {
      const exercises = await response.json();
      setExercises(exercises);
    }
  }

  useEffect(() => {
    try {
      getExercises();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const exercisesById = new Map<string, Exercise>();
  exercises?.forEach((exercise) => exercisesById.set(exercise.id, exercise));

  return { exercises, exercisesById };
};

const ExerciseContext = createContext<ExerciseData>({} as ExerciseData);

export const useExercises = () => {
  return useContext(ExerciseContext);
};

export const ProvideExercises: React.FC = ({ children }) => {
  const exerciseData = useProvideExercises();
  return (
    <ExerciseContext.Provider value={exerciseData}>
      {children}
    </ExerciseContext.Provider>
  );
};
