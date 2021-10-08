import { MenuItem, TextField, InputAdornment, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { useState, ChangeEvent, useEffect } from "react";
import { ExerciseOptions } from "./exercise-options";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  CreateWorkoutRequest,
  Exercise,
  // ExerciseCategory,
  ExerciseConfiguration,
  Workout,
} from "../../shared/models";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";

export enum ExerciseCategory {
  LowerBody = "Lower Body",
  UpperBody = "Upper Body",
  Cardio = "Cardio",
}

export const CreateWorkout = () => {
  const history = useHistory();
  const [category, setCategory] = useState<ExerciseCategory>();
  const [exercise, setExercise] = useState<Exercise>();
  const [name, setName] = useState<string>("");
  const [sets, setSets] = useState<number>(1);
  const [reps, setReps] = useState<number>(1);
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [savedExercise, setSavedExercise] = useState(false);
  const [exerciseConfigs, setExerciseConfigs] = useState<
    ExerciseConfiguration[]
  >([]);
  const [exercises, setExercises] = useState([]);

  // let {path, url} = useRouteMatch();

  async function callAPI() {
    const url = "/api/exercises";
    const result = await fetch(url);
    const exercises = await result.json();
    setExercises(exercises);
  }

  useEffect(() => {
    try {
      callAPI();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleChangeSave = () => {
    const exerciseConfiguration: ExerciseConfiguration = {
      exercise: exercise as Exercise,
      sets,
      reps,
      durationMinutes,
    };
    setSavedExercise(true);
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
    console.log("workout name: ", name);
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
              value={exercise && exercise.name}
              onSelectExercise={setExercise}
              exercises={exercises}
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
              onClick={() => handleChangeSave()}
              className={""}
            >
              <AddIcon />
            </Fab>
          </>
        ) : (
          ""
        )}
      </div>{" "}
      {savedExercise ? (
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
                              <DeleteIcon />
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
