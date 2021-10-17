import { Button } from "@material-ui/core";

export const SignIn = () => {
  return (
    <div className="header">
      <h1>
        <b>
          <i>SESSION</i>
        </b>
      </h1>
      <h3>create, track, and save your workouts</h3>
      <br />
      <Button
        variant="outlined"
        color="primary"
        onClick={() => (window.location.href = "/auth/google")}
      >
        Sign in with Google
      </Button>
    </div>
  );
};
