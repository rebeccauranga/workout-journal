import "./styles.css";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";


export const Home = () => {
  //   const [newWorkout, setNewWorkout] = useState(false);
  return (
    <>
      <div className="content">
        <div className="header">
          {/* <LongMenu /> */}
          <>
            <div className="new">
              <Button
                variant="outlined"
                color="primary"
                // onClick={() => setNewWorkout(true)}
              >
                <Link to="/workouts/new">NEW WORKOUT</Link>
              </Button>
            </div>
            <Button variant="outlined" color="secondary">
              view workouts
            </Button>
          </>
        </div>
      </div>
    </>
  );
};
