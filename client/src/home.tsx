import "./styles.css";
import { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

import { useHistory } from "react-router-dom";
import { Workout, WorkoutSession } from "../../shared/models";
import WorkoutCard from "./WorkoutCard";
import { fabLeftStyles, fabRightStyles } from "./styles";

export const Home = () => {
  const history = useHistory();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [workoutSession, setWorkoutSession] = useState<
    WorkoutSession | undefined
  >();

  const getWorkouts = async () => {
    const response = await fetch("/api/workouts");
    if (response.status === 200) {
      const data = await response.json();
      setWorkouts(data);
    } else {
      console.log(response);
    }
  };

  const getActiveWorkoutSession = async () => {
    const response = await fetch("/api/workouts/session");
    if (response.status === 200) {
      const data = await response.json();
      setWorkoutSession(data);
    }
  };

  useEffect(() => {
    getWorkouts();
    getActiveWorkoutSession();
  }, []);

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{ margin: "20px 0px", justifyContent: "space-between" }}
      >
        <Fab
          color="primary"
          className="fab-base"
          style={fabLeftStyles}
          onClick={() => history.push("/workouts/new")}
        >
          <AddIcon />
        </Fab>
        {workoutSession && (
          <Fab
            color="secondary"
            style={fabRightStyles}
            onClick={() => history.push(`/session/${workoutSession?.id}`)}
          >
            <FitnessCenterIcon />
          </Fab>
        )}
      </Stack>
      {workouts.length ? (
        <Grid container spacing={6} justifyContent="center">
          {workouts.map((workout) => {
            return (
              <Grid item key={workout.id}>
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                  session={workoutSession}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography variant="h6">Looks like you need some workouts!</Typography>
      )}
    </>
  );
};
