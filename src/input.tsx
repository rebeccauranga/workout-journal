// import { SetsAndReps } from "./sets-and-reps";
import { MenuItem, TextField, InputAdornment, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { useState, ChangeEvent } from "react";
import { ExerciseOptions } from "./exercise-options";
import { legs } from "./workouts";

export const Input = () => {
  const [split, setSplit] = useState("");
  const [legWorkout, setLegWorkout] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLegWorkout(event.target.value);
  };
  const handleChangeSplit = (event: ChangeEvent<HTMLInputElement>) => {
    setSplit(event.target.value);
    console.log(split);
  };
  const handleSets = (event: ChangeEvent<HTMLInputElement>) => {
    setSets(event.target.value);
  };
  const handleReps = (event: ChangeEvent<HTMLInputElement>) => {
    setReps(event.target.value);
  };

  const renderOptions = () => {
    switch (split) {
      case "legs":
        <>
          <ExerciseOptions
            value={legWorkout}
            change={handleChange}
            bodyPart={legs}
          />
          <br />
        </>;
      case "arms":
        <>
          <ExerciseOptions
            value={legWorkout}
            change={handleChange}
            bodyPart={legs}
          />
          <br />
        </>;
      case "cardio":
        <>
          <ExerciseOptions
            value={legWorkout}
            change={handleChange}
            bodyPart={legs}
          />
          <br />
        </>;
      default:
        break;
    }
  };

  return (
    <div className="inputs">
      <TextField
        id="outlined-select-currency"
        select
        label="Body Part"
        value={split}
        onChange={handleChangeSplit}
        variant="outlined"
      >
        <MenuItem key={"legs"} value={"legs"}>
          Legs
        </MenuItem>
        <MenuItem key={"arms"} value={"arms"}>
          Arms
        </MenuItem>
        <MenuItem key={"cardio"} value={"cardio"}>
          Cardio
        </MenuItem>
      </TextField>
      <br />

      {renderOptions()}
      {legWorkout !== "" && (
        <>
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
        </>
      )}
      {sets !== "" && reps !== "" && (
        <>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
          >
            Save Exercise
          </Button>
        </>
      )}
    </div>
  );
};

// TO DO + IDEAS
// - snackbar for added workout
