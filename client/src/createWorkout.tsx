import { MenuItem, TextField, InputAdornment, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { useState, ChangeEvent, useEffect, } from "react";
import { ExerciseOptions } from "./exercise-options";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Exercise,
  // ExerciseCategory,
  ExerciseConfiguration,
} from "../../shared/models";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

export enum ExerciseCategory {
  LowerBody = "Lower Body",
  UpperBody = "Upper Body",
  Cardio = "Cardio",
}

export const CreateWorkout = () => {
  const match = useRouteMatch();
  const [category, setCategory] = useState<ExerciseCategory>();
  const [exercise, setExercise] = useState<Exercise>();
  const [sets, setSets] = useState<number>();
  const [reps, setReps] = useState<number>();
  const [durationSeconds, setDurationSeconds] = useState<number>();
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
    setSavedExercise(true);
    setExerciseConfigs([...exerciseConfigs, { exercise, sets, reps }]);
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

  const handleOnDurationSecondsChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setDurationSeconds(parseInt(event.target.value));
  };

  return (
    <>
      <div className="inputs">
        <div className="splitstuff">
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
            onChange={handleOnDurationSecondsChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Duration</InputAdornment>
              ),
            }}
            variant="outlined"
          />
        )}
        <br />
        {(sets && reps && category !== ExerciseCategory.Cardio) ||
        (durationSeconds && category === ExerciseCategory.Cardio) ? (
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
              {exerciseConfigs.map(({ exercise, sets, reps }, index) => {
                return (
                  exercise && (
                    <div key={index}>
                      <li key={index}>
                        <span>
                          {exercise.name} {sets} sets of {reps}
                        </span>
                        <button className="delete-exercise-btn">
                          <IconButton aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </button>
                      </li>
                    </div>
                  )
                );
              })}
            </ul>
          </div>
          <br />
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
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
