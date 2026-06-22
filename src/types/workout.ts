export interface UserWorkoutData {
  exerciseId: number;
  sets: string;
  reps: string;
  weights: string;
  completedAt: string;
}

export interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: string;
  note: string;
  weights?: string;
  userWorkoutData?: UserWorkoutData;
}

export interface WorkoutDay {
  id: number;
  day: string;
  focus: string;
  exercises: Exercise[];
  completedAt?: string;
}

export interface WorkoutPlan {
  planName: string;
  days: WorkoutDay[];
}

export interface WorkoutApiResponse {
  success: boolean;
  workoutPlan: string;
}
