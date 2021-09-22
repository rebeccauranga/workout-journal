import React from "react";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";

export const CreateAnAccount = () => {
  return (
    <div className="header">
      <h2>Create an account</h2>
      <TextField
        required
        id="outlined-required"
        label="Username"
        defaultValue=""
      />
      <br />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
      <br />
      <button>
        <Link to="/workouts">Submit</Link>
      </button>
    </div>
  );
};
