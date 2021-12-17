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
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { ProvideAuth, useAuth } from "./auth";
import { ProvideExercises } from "./exercises-context";
import NavBar from "./navbar";
import { User } from "shared/models";
import SessionDetail from "./SessionDetail";

export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ProvideAuth>
          <ProvideExercises>
            <Router>
              <Box>
                <CssBaseline/>
                <NavBar />
                <Container sx={{marginTop: "60px" }}>
                  <Routes />
                </Container>
              </Box>
            </Router>
          </ProvideExercises>
        </ProvideAuth>
      </ThemeProvider>
    </>
  );
};

interface PrivateRouteProps extends RouteProps {
  user?: User;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
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
  );
};
