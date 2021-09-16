import { MenuItem, TextField } from "@material-ui/core";
// import PropTypes, { InferProps} from "prop-types";

export const ExerciseOptions = ({ value, change, bodyPart, label }) => {
  return (
    <TextField
      id="outlined-select-currency"
      className="options"
      type="number"
      select
      label={label}
      value={value}
      onChange={change}
      variant="outlined"
    >
      {bodyPart.map((option: string) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

// ExerciseOptions.propTypes = {
//     legWorkout: PropTypes.string.isRequired,
//     handleChange: PropTypes.number.isRequired,
//     bodyPart: PropTypes.Array.isRequired
//   };
