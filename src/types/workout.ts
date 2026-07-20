export interface UserWorkoutData {
  exerciseId: number;
  sets: string;
  reps: string;
  customReps?: string;
  weights: string;
  customWeights?: string;
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

export interface ExerciseLog {
  exerciseId: number;
  exerciseName: string;
  plannedSets: number;
  plannedReps: string;
  actualSets: number;
  actualReps: string;
  actualWeight: string;
  completed: boolean;
}

export interface WorkoutSession {
  id: string;
  planName: string;
  dayId: number;
  dayLabel: string;
  focus: string;
  completedAt: string;
  exercises: ExerciseLog[];
}
