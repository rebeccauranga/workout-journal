import React from "react";
import "./styles.css";
import { CreateWorkout } from "./createWorkout";
import { SignIn } from "./signin";
import { Home } from "./home";
import WorkoutDetail from "./WorkoutDetail";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
  Redirect,
} from "react-router-dom";
import { ProvideAuth, useAuth } from "./auth";
import NavBar from "./navbar";
import { User } from "../../shared/models";
import SessionDetail from "./SessionDetail";

export const App = () => {
  return (
    <>
      <ProvideAuth>
        <Router>
          <NavBar />
          <Routes />
        </Router>
      </ProvideAuth>
    </>
  );
};

interface PrivateRouteProps extends RouteProps {
  user?: User;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  ...rest
}) => {
  const auth = useAuth();
  return auth.loaded ? (
    <Route
      {...rest}
      render={() => {
        return auth.user ? children : <Redirect to="/signin" />;
      }}
    />
  ) : null;
};

const Routes: React.FC = () => {
  const auth = useAuth();
  const defaultRoute = (): React.ReactNode => {
    return auth.user ? <Redirect to="/workouts" /> : <SignIn />;
  };

  return (
    <div className="content">
      <Switch>
        <Route exact path="/signin" render={defaultRoute} />
        <PrivateRoute exact path={"/workouts/new"}>
          <CreateWorkout />
        </PrivateRoute>
        <PrivateRoute exact path="/workouts">
          <Home />
        </PrivateRoute>
        <PrivateRoute exact path="/workouts/:id">
          <WorkoutDetail />
        </PrivateRoute>
        <PrivateRoute exact path="/session/:id">
          <SessionDetail />
        </PrivateRoute>
        <Route path="/" render={defaultRoute} />
      </Switch>
    </div>
  );
};
