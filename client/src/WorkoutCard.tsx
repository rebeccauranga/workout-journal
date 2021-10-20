import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
} from "@mui/icons-material";
import { Workout } from "../../shared/models";
import { Link } from "react-router-dom";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workout,
}: WorkoutCardProps) => {
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
        <Button size="small" color="primary">
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
