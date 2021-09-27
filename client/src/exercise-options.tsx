import { MenuItem, TextField } from "@material-ui/core";
import { ChangeEvent } from "react";
import { Exercise, ExerciseCategory } from "../../shared/models";

interface ExerciseOptionsProps {
  category: ExerciseCategory;
  value: string;
  exercises: Exercise[];
  onSelectExercise: (exercise: Exercise) => void;
}

export const ExerciseOptions = ({
  value,
  category,
  exercises,
  onSelectExercise,
}: ExerciseOptionsProps) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedExerciseId = event.target.value;
    const selectedExercise = exercises.find(
      (exercise) => exercise.id === selectedExerciseId
    );
    if (selectedExercise) {
      onSelectExercise(selectedExercise);
    }
  };

  if (!exercises) {
    return null;
  }

  return (
    <TextField
      id="outlined-select-currency"
      className="options"
      select
      label={`Choose your ${category} exercises.`}
      value={value}
      onChange={handleOnChange}
      variant="outlined"
    >
      {exercises
        .filter((exercise) => exercise.category === category)
        .map((option: Exercise) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
    </TextField>
  );
};
