import "./styles.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Workout } from "../../shared/models";

export const Home = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const getWorkouts = async () => {
    const response = await fetch("/api/workouts");
    if (response.status === 200) {
      const data = await response.json();
      setWorkouts(data);
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  return (
    <>
      <div className="content">
        <div className="header">
          <>
            <div className="new">
              <Button variant="outlined" color="primary">
                <Link to="/workouts/new">NEW WORKOUT</Link>
              </Button>

              <ul>
                {workouts.map((workout) => {
                  return (
                    <li key={workout.id}>
                      <Link to={`/workouts/${workout.id}`}>{workout.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        </div>
      </div>
    </>
  );
};
