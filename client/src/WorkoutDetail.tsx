import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WorkoutDetail } from "../../shared/models";

const WorkoutDetailComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [workoutDetail, setWorkoutDetail] = useState<WorkoutDetail>();

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
    <>
      <h4>Workout {workoutDetail.name}</h4>
      {workoutDetail.exercises.map((exercise) => {
        return (
          <div key={exercise.exercise_id}>
            {exercise.created_at}
            <li>Reps: {exercise.reps}</li>
            <li>Sets: {exercise.sets}</li>
          </div>
        );
      })}
    </>
  ) : null;
};

export default WorkoutDetailComponent;
