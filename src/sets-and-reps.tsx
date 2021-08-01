import { TextField, Button } from "@material-ui/core";

export const SetsAndReps = () => {
  return (
    <div>
      <TextField id="standard-basic" label="Sets" />
      
      <TextField id="standard-basic" label="Reps" />
      <Button variant="contained" color="secondary">
       +
      </Button>
    </div>
  );
};
