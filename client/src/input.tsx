import { MenuItem, TextField, InputAdornment, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { useState, ChangeEvent, useEffect } from "react";
import { lowerBody, upperBody, cardio } from "./workouts";
import { ExerciseOptions } from "./exercise-options";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export const Input = () => {
  const [split, setSplit] = useState(null);
  const [workoutType, setWorkoutType] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [time, setTime] = useState("");
  const [savedExercise, setSavedExercise] = useState(false);
  const [exercise, setExercise] = useState([
    { workoutType: "", sets: "", reps: "" },
  ]);

  // async function callApi(){
  //   const response = await fetch('localhost:3000/api/exercises');
  //   debugger
  //   const body = await response.json();
  //   console.log(body);
  //   if (response.status !== 200) throw Error(body.message);
  //   return body;
  // };

  // // console.log(callApi());
  // useEffect(() => {
  //   callApi();
  // })

  const handleChangeSave = () => {
    setSavedExercise(true);
    setExercise([
      ...exercise,
      { workoutType: workoutType, sets: sets, reps: reps },
    ]);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWorkoutType(event.target.value);
  };
  const handleChangeSplit = (event: ChangeEvent<HTMLInputElement>) => {
    setSplit(event.target.value);
  };
  const handleSets = (event: ChangeEvent<HTMLInputElement>) => {
    setSets(event.target.value);
  };
  const handleReps = (event: ChangeEvent<HTMLInputElement>) => {
    setReps(event.target.value);
  };
  const handleTime = (event: ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  return (
    <>
      <div className="inputs">
        <div className="splitstuff">
          <TextField
            id="outlined-select-currency"
            select
            label="Choose your workout split"
            value={split}
            onChange={handleChangeSplit}
            variant="outlined"
          >
            <MenuItem key={"lowerBody"} value={"lowerBody"}>
              Lower Body
            </MenuItem>
            <MenuItem key={"upperBody"} value={"upperBody"}>
              Upper Body
            </MenuItem>
            <MenuItem key={"cardio"} value={"cardio"}>
              Cardio
            </MenuItem>
          </TextField>
          <br />
          {split === "lowerBody" && (
            <ExerciseOptions
              value={workoutType}
              change={handleChange}
              bodyPart={lowerBody}
              label={"Choose your lower body exercises"}
            />
          )}{" "}
          {split === "upperBody" && (
            <ExerciseOptions
              value={workoutType}
              change={handleChange}
              bodyPart={upperBody}
              label={"Choose your upper body exercises"}
            />
          )}{" "}
          {split === "cardio" && (
            <ExerciseOptions
              value={workoutType}
              change={handleChange}
              bodyPart={cardio}
              label={"Choose your cardio"}
            />
          )}
        </div>
        <br />
        {workoutType !== "" &&
          (split === "lowerBody" || split === "upperBody") && (
            <div className="sets-and-reps">
              <div className="sets">
                <TextField
                  label=""
                  id="sets"
                  onChange={handleSets}
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
                onChange={handleReps}
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
        {split === "cardio" && workoutType !== "" && (
          <TextField
            label=""
            id="time"
            onChange={handleTime}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Duration</InputAdornment>
              ),
            }}
            variant="outlined"
          />
        )}
        <br />
        {(sets !== "" && reps !== "" && split !== "cardio") ||
        (time !== "" && split === "cardio") ? (
          <>
            {/* <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => handleChangeSave()}
              startIcon={<SaveIcon />}
            >
              Add Exercise
            </Button> */}
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
              {exercise.map(({ workoutType, sets, reps }, index) => {
                return (
                  workoutType && (
                    <div key={index}>
                      <li key={index}>
                        <span>
                          {workoutType} {sets} sets of {reps}
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
            // onClick={handleChangeSave}
            startIcon={<SaveIcon />}
          >
            Save workout
          </Button>
          {/* <TransitionsModal /> */}
        </div>
      ) : (
        ""
      )}
    </>
  );
};
