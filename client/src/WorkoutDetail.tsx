import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WorkoutDetail, Exercise } from "../../shared/models";
import { useExercises } from "./exercises-context";

// TO DO: add info icon and tooltip with exercise description

const WorkoutDetailComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [workoutDetail, setWorkoutDetail] = useState<WorkoutDetail>();
  const { exercisesById } = useExercises();
  const workoutCreationDate = new Date(workoutDetail?.created_at);

  const getWorkoutDetail = async () => {
    if (!id) {
      return;
    }
    const response = await fetch(`/api/workouts/${id}`);
    if (response.status === 200) {
      const data = await response.json();
      setWorkoutDetail(data);
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    getWorkoutDetail();
  }, []);

  return workoutDetail ? (
    <div className="workout-detail">
      <div className="workout-detail-name-date">
      <p className="workout-detail-name">{workoutDetail.name}</p>
      <span>{workoutCreationDate.toLocaleString()}</span>
      </div>
      {workoutDetail.exercises.map((exercise) => {
        const exerciseDetail: Exercise = exercisesById.get(
          exercise.exercise_id
        ) as Exercise;
        return (
          <div key={exercise.exercise_id} className="exercise-details">
            <b>{exerciseDetail.name}</b>{" "}
            {exerciseDetail.category === "Cardio" ? (
              <span>{`${exercise.duration_minutes} minutes`}</span>
            ) : (
              <span>
                {exercise.sets} sets of {exercise.reps}
              </span>
            )}
          </div>
        );
      })}
    </div>
  ) : null;
};

export default WorkoutDetailComponent;
