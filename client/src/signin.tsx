import React from "react";

import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import { Google as GoogleIcon } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const SignIn = () => {
  return (
    <>
      <Stack
        spacing={2}
        alignItems="center"
        sx={{ marginTop: "15rem" }}
      >
        <Typography variant="h4">Session</Typography>
        <Typography variant="subtitle1">
          create, track, and save your workouts
        </Typography>
        <Divider orientation="horizontal" flexItem />
        <Fab
          variant="extended"
          size="medium"
          onClick={() => (window.location.href = "/auth/google")}
        >
          <GoogleIcon sx={{ mr: 1 }} />
          Sign In
        </Fab>
      </Stack>
    </>
  );
};
