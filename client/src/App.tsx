import "./styles.css";
import { Input } from "./input";
import LongMenu from "./menu";
import React, { useEffect, useState } from "react";
import SimpleBottomNavigation from "./bottom-nav";
import Button from "@material-ui/core/Button";

export const App = () => {
  const [newWorkout, setNewWorkout] = useState(false);
  return (
    <>
      {/* <Menu /> */}
      <div className="content">
        <div className="header">
          <LongMenu />
          {!newWorkout && (
            <>
          <h1>
            <b>
              <i>SESSION</i>
            </b>
          </h1>
          <h3>create, track, and save your workouts</h3>
            <div className="new">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setNewWorkout(true)}
              >
                NEW WORKOUT
              </Button>
            </div>
              <Button variant="outlined" color="secondary">
                view workouts
              </Button>
            </>
          )}
        </div>
        {newWorkout && <Input />}
      </div>
      <SimpleBottomNavigation />
    </>
  );
};
