import { useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import {
  MenuItem,
  TextField,
  InputAdornment,
  Fab,
  IconButton,
} from "@mui/material";
import {
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import { ExerciseOptions } from "./exercise-options";
import { useExercises } from "./exercises-context";
import {
  CreateWorkoutRequest,
  Exercise,
  ExerciseConfiguration,
} from "../../shared/src/models";
import { fabLeftStyles, fabRightStyles } from "./styles";

export enum ExerciseCategory {
  LowerBody = "Lower Body",
  UpperBody = "Upper Body",
  Cardio = "Cardio",
}

export const CreateWorkout = () => {
  const history = useHistory();
  const { exercises } = useExercises();
  const [validationError, setValidationError] = useState<string>();
  const [category, setCategory] = useState<ExerciseCategory>();
  const [exercise, setExercise] = useState<Exercise>();
  const [name, setName] = useState<string>("");
  const [sets, setSets] = useState<number>(3);
  const [reps, setReps] = useState<number>(10);
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [exerciseConfigs, setExerciseConfigs] = useState<
    ExerciseConfiguration[]
  >([]);

  const isUpperBody = category === ExerciseCategory.UpperBody;
  const isLowerBody = category === ExerciseCategory.LowerBody;
  const isCardio = category === ExerciseCategory.Cardio;
  const isValidCardioExercise = exercise && isCardio && durationMinutes > 0;
  const isValidWeightsExercise =
    exercise && (isUpperBody || isLowerBody) && sets > 0 && reps > 0;
  const isValidExercise = isValidCardioExercise || isValidWeightsExercise;

  const handleAddExercise = () => {
    const exerciseConfiguration: ExerciseConfiguration = {
      exercise: exercise as Exercise,
      sets,
      reps,
      durationMinutes,
    };
    setExerciseConfigs([...exerciseConfigs, exerciseConfiguration]);
  };

  const handleSaveWorkout = async () => {
    if (!name) {
      setValidationError("Workout name is required");
      return;
    }
    try {
      const data: CreateWorkoutRequest = {
        name: name,
        exercises: exerciseConfigs,
      };
      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resp = await response.json();
      alert(resp.message);
      if (response.status === 200) {
        history.push("/workouts");
      }
    } catch (e) {
      console.error("create workout: ", e);
    }
  };

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (name !== "") {
      setValidationError(undefined);
    }
  };

  const handleChangeCategory = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value as ExerciseCategory);
  };

  const handleOnSetsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSets(parseInt(event.target.value));
  };

  const handleOnRepsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReps(parseInt(event.target.value));
  };

  const handleOnDurationMinutesChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setDurationMinutes(parseInt(event.target.value));
  };

  const removeFromList = (exerciseId: string): void => {
    setExerciseConfigs(
      exerciseConfigs.filter((exercise) => exercise.exercise.id !== exerciseId)
    );
  };

  // adjust which exercises should be seen.
  const selectedExerciseIds = exerciseConfigs.map((ec) => ec.exercise.id);
  const selectableExercises = exercises.filter(
    (ex) => !selectedExerciseIds.includes(ex.id)
  );
  return (
    <>
      <div className="inputs">
        <div className="splitstuff">
          <TextField
            id="outlined-basic"
            label="Workout name"
            variant="outlined"
            onChange={handleChangeName}
            helperText={validationError}
            error={Boolean(validationError)}
          />
          <br />
          <TextField
            id="outlined-select-currency"
            select
            label="Choose your workout split"
            value={category}
            onChange={handleChangeCategory}
            variant="outlined"
          >
            <MenuItem
              key={ExerciseCategory.LowerBody}
              value={ExerciseCategory.LowerBody}
            >
              Lower Body
            </MenuItem>
            <MenuItem
              key={ExerciseCategory.UpperBody}
              value={ExerciseCategory.UpperBody}
            >
              Upper Body
            </MenuItem>
            <MenuItem
              key={ExerciseCategory.Cardio}
              value={ExerciseCategory.Cardio}
            >
              Cardio
            </MenuItem>
          </TextField>
          <br />
          {category && (
            <ExerciseOptions
              category={category}
              value={exercise?.name}
              onSelectExercise={setExercise}
              exercises={selectableExercises}
              disabled={selectableExercises.length === 0}
            />
          )}
        </div>
        <br />
        {exercise &&
          (category === ExerciseCategory.LowerBody ||
            category === ExerciseCategory.UpperBody) && (
            <div className="sets-and-reps">
              <div className="sets">
                <TextField
                  label=""
                  id="sets"
                  type="number"
                  value={sets}
                  onChange={handleOnSetsChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Sets</InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </div>
              <br />
              <TextField
                label="Reps"
                id="reps"
                type="number"
                value={reps}
                onChange={handleOnRepsChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Reps</InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <br />
            </div>
          )}
        {category === ExerciseCategory.Cardio && exercise && (
          <TextField
            label=""
            id="time"
            type="number"
            value={durationMinutes}
            onChange={handleOnDurationMinutesChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  Duration (minutes)
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        )}
        <br />
        {isValidExercise ? (
          <Fab
            color="secondary"
            aria-label="add"
            style={fabRightStyles}
            onClick={() => handleAddExercise()}
            className={""}
          >
            <AddIcon />
          </Fab>
        ) : null}
      </div>{" "}
      {exerciseConfigs.length > 0 && (
        <div>
          <Stack spacing={1} alignItems="center">
            {exerciseConfigs.map(
              ({ exercise, sets, reps, durationMinutes }, index) => {
                return (
                  exercise && (
                    <div key={index} style={{display: "flex", width: "300px", justifyContent: "space-between", alignItems: "center"}}>
                      {exercise.category === ExerciseCategory.Cardio ? (
                        <span>
                          {exercise.name} for {durationMinutes} minutes
                        </span>
                      ) : (
                        <span>
                          {exercise.name} {sets} sets of {reps}
                        </span>
                      )}
                      <IconButton
                        aria-label="delete"
                        onClick={() => removeFromList(exercise.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )
                );
              }
            )}
          </Stack>
          <Fab
            color="primary"
            onClick={handleSaveWorkout}
            style={fabLeftStyles}
          >
            <SaveIcon />
          </Fab>
        </div>
      )}
    </>
  );
};
