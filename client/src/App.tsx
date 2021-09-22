import "./styles.css";
import { CreateWorkout } from "./createWorkout";
import LongMenu from "./menu";
import React, { useState } from "react";
import SimpleBottomNavigation from "./bottom-nav";
import Button from "@material-ui/core/Button";
import { SignIn } from "./signin";
import { Home } from "./home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CreateAnAccount } from "./createAnAccount";

export const App = () => {
  return (
    <Router>
      <div className="content">
        {/* <div className="header">
          <LongMenu />
        </div> */}
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route exact path={"/workouts/new"}>
            <CreateWorkout />
          </Route>
          <Route path="/workouts">
            <Home />
          </Route>
          <Route path="/new-account">
            <CreateAnAccount />
          </Route>
        </Switch>
      </div>
      {/* <SimpleBottomNavigation /> */}
    </Router>
  );
};
