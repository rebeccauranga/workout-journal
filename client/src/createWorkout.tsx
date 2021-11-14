import { useState, ChangeEvent } from "react";
import { MenuItem, TextField, InputAdornment, Button, Fab, IconButton } from "@mui/material";
import { Save as SaveIcon, Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { ExerciseOptions } from "./exercise-options";
import { useExercises } from "./exercises-context";
import {
  CreateWorkoutRequest,
  Exercise,
  ExerciseConfiguration
} from "../../shared/models";
import {
  useHistory
} from "react-router-dom";

export enum ExerciseCategory {
  LowerBody = "Lower Body",
  UpperBody = "Upper Body",
  Cardio = "Cardio",
}

export const CreateWorkout = () => {
  const history = useHistory();
  const { exercises } = useExercises();
  const [category, setCategory] = useState<ExerciseCategory>();
  const [exercise, setExercise] = useState<Exercise>();
  const [name, setName] = useState<string>("");
  const [sets, setSets] = useState<number>(3);
  const [reps, setReps] = useState<number>(10);
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [exerciseConfigs, setExerciseConfigs] = useState<
    ExerciseConfiguration[]
  >([]);

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
                label=""
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
        {(sets && reps && category !== ExerciseCategory.Cardio) ||
        (durationMinutes && category === ExerciseCategory.Cardio) ? (
          <>
            <Fab
              size="medium"
              color="secondary"
              aria-label="add"
              onClick={() => handleAddExercise()}
              className={""}
            >
              <AddIcon />
            </Fab>
          </>
        ) : (
          ""
        )}
      </div>{" "}
      {exerciseConfigs.length > 0 ? (
        <div className="saved">
          <div>
            <ul>
              {exerciseConfigs.map(
                ({ exercise, sets, reps, durationMinutes }, index) => {
                  return (
                    exercise && (
                      <div key={index}>
                        <li key={index}>
                          {exercise.category === ExerciseCategory.Cardio ? (
                            <span>
                              {exercise.name} for {durationMinutes} minutes
                            </span>
                          ) : (
                            <span>
                              {exercise.name} {sets} sets of {reps}
                            </span>
                          )}
                          <button className="delete-exercise-btn">
                            <IconButton aria-label="delete">
                              <DeleteIcon
                                onClick={() => removeFromList(exercise.id)}
                              />
                            </IconButton>
                          </button>
                        </li>
                      </div>
                    )
                  );
                }
              )}
            </ul>
          </div>
          <br />
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
            onClick={handleSaveWorkout}
          >
            Save workout
          </Button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
