import React from "react";
import { TextField } from "@material-ui/core";
import { CreateAnAccount } from "./createAnAccount";
import { Link } from "react-router-dom";

export const SignIn = () => {
  return (
    <div className="header">
      <h1>
        <b>
          <i>SESSION</i>
        </b>
      </h1>
      <h3>create, track, and save your workouts</h3>
      <h2>Please sign in</h2>
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
      <button>Sign In</button>
      <Link to={"/new-account"}>Create an account</Link>
    </div>
  );
};
