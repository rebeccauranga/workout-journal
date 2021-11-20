import "./styles.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Workout, WorkoutSession } from "../../shared/models";
import WorkoutCard from "./WorkoutCard";

export const Home = () => {
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
      <div className="content">
        <div className="header">
          <>
            <div className="new">
              <div className="workout-session-btns">
                <Button variant="outlined" color="primary">
                  <Link to="/workouts/new">NEW WORKOUT</Link>
                </Button>

                {workoutSession && (
                  <Button variant="outlined" color="primary">
                    <Link to={`/session/${workoutSession?.id}`}>
                      Current Session
                    </Link>
                  </Button>
                )}
              </div>

              <div className="workout-cards">
                {workouts.map((workout) => {
                  return (
                    <WorkoutCard
                      key={workout.id}
                      workout={workout}
                      session={workoutSession}
                    />
                  );
                })}
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};
