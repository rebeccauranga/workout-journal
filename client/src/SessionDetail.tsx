import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import {
  Workout,
  Exercise,
  WorkoutExercise,
  WorkoutSession,
  WorkoutSessionExercise,
} from "../../shared/src/models";
import { fabRightStyles } from "./styles";
import { useExercises } from "./exercises-context";

const SessionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { exercisesById } = useExercises();

  const [session, setSession] = useState<WorkoutSession | undefined>();
  const [workout, setWorkout] = useState<Workout | undefined>();
  const [exerciseConfigs, setExerciseConfigs] = useState<WorkoutExercise[]>([]);
  const [exerciseStatuses, setExerciseStatuses] = useState<
    WorkoutSessionExercise[]
  >([]);

  async function getWorkoutSessionDetails() {
    const response = await fetch(`/api/workouts/session/${id}/details`);
    if (response.status === 200) {
      const { data } = await response.json();
      const { session, workout, exerciseConfigs, exerciseStatuses } = data;
      setWorkout(workout);
      setSession(session);
      setExerciseConfigs(exerciseConfigs);
      setExerciseStatuses(exerciseStatuses);
    }
  }

  async function handleCompleteWorkout() {
    const response = await fetch(`/api/workouts/session/${id}/completed`, {
      method: "PATCH",
    });
    if (response.status === 200) {
      history.push("/workouts");
    }
  }

  async function handleToggleCompleteExercise(exerciseId: string) {
    const response = await fetch(
      `/api/workouts/session/${id}/exercise/${exerciseId}/toggle-complete`,
      { method: "PATCH" }
    );
    if (response.status === 200) {
      const { completed_at } = await response.json();
      const newStatuses = exerciseStatuses.map((es) => {
        if (es.exercise_id === exerciseId) {
          return { ...es, completed_at };
        }
        return es;
      });

      setExerciseStatuses(newStatuses);
    } else {
      alert(response.status);
    }
  }

  const handleCheckboxValueChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const exerciseId = e.currentTarget.id;
    if (exerciseId) {
      await handleToggleCompleteExercise(exerciseId);
    }
  };

  useEffect(() => {
    getWorkoutSessionDetails();
  }, []);

  const started = new Date(session?.created_at as Date);
  const completed = session?.completed_at
    ? new Date(session?.completed_at as Date)
    : undefined;
  return (
    <div>
      <h3>{workout?.name}</h3>
      <h5>
        started: {started.toLocaleDateString()} {started.toLocaleTimeString()}
      </h5>
      {completed && (
        <h5>
          completed: {completed.toLocaleDateString()}{" "}
          {completed.toLocaleTimeString()}
        </h5>
      )}
      <FormGroup>
        {exerciseConfigs &&
          exerciseConfigs.map((ec) => {
            const exercise: Exercise = exercisesById.get(
              ec.exercise_id
            ) as Exercise;
            const status = exerciseStatuses.find(
              (es) => es.exercise_id === ec.exercise_id
            );

            const config =
              exercise.category === "Cardio"
                ? `${exercise.name} (${ec.duration_minutes} minutes)`
                : `${exercise.name} (${ec.sets} sets of ${ec.reps})`;
            return (
              <>
                <FormControlLabel
                  key={ec.exercise_id}
                  control={
                    <Checkbox
                      id={ec.exercise_id}
                      checked={Boolean(status?.completed_at)}
                      onChange={handleCheckboxValueChange}
                    />
                  }
                  label={<div>{config}</div>}
                />
              </>
            );
          })}
      </FormGroup>
      <Fab
        style={fabRightStyles}
        color="secondary"
        aria-label="complete"
        onClick={handleCompleteWorkout}
      >
        <CheckIcon />
      </Fab>
    </div>
  );
};

export default SessionDetail;
