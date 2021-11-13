import React from "react";
import { Link, useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
} from "@mui/icons-material";

import { Workout, WorkoutSession } from "../../shared/models";

interface WorkoutCardProps {
  workout: Workout;
  session?: WorkoutSession;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workout,
  session,
}: WorkoutCardProps) => {
  const history = useHistory();
  const createNewSession = async (workoutId: string): Promise<void> => {
    const url = "/api/workouts/session";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ workoutId: workoutId }),
    });
    const { sessionId, message } = await response.json();
    if (response.status === 201) {
      history.push(`/session/${sessionId}`);
    } else {
      alert("error creating new session: " + message);
    }
  };

  return (
    <Card sx={{ marginTop: "20px", width: "325px" }}>
      <Link to={`/workouts/${workout.id}`}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {workout.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={async () => await createNewSession(workout.id)}
          disabled={Boolean(session)}
        >
          New session
        </Button>
        <Button size="small" color="secondary">
          {workout.favorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
        </Button>
      </CardActions>
    </Card>
  );
};

export default WorkoutCard;
