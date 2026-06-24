import type { ExerciseLog, WorkoutSession } from "@/types/workout";

const WORKOUT_SESSIONS_STORAGE_KEY = "workoutSessions";

const canUseStorage = () => typeof window !== "undefined";

const isExerciseLog = (value: unknown): value is ExerciseLog => {
  if (!value || typeof value !== "object") return false;

  const exerciseLog = value as Partial<ExerciseLog>;

  return (
    typeof exerciseLog.exerciseId === "number" &&
    typeof exerciseLog.exerciseName === "string" &&
    typeof exerciseLog.plannedSets === "number" &&
    typeof exerciseLog.plannedReps === "string" &&
    typeof exerciseLog.actualSets === "number" &&
    typeof exerciseLog.actualReps === "string" &&
    typeof exerciseLog.actualWeight === "string" &&
    typeof exerciseLog.completed === "boolean"
  );
};

const isWorkoutSession = (value: unknown): value is WorkoutSession => {
  if (!value || typeof value !== "object") return false;

  const session = value as Partial<WorkoutSession>;

  return (
    typeof session.id === "string" &&
    typeof session.planName === "string" &&
    typeof session.dayId === "number" &&
    typeof session.dayLabel === "string" &&
    typeof session.focus === "string" &&
    typeof session.completedAt === "string" &&
    Array.isArray(session.exercises) &&
    session.exercises.every(isExerciseLog)
  );
};

const sortSessionsByCompletedAtDesc = (sessions: WorkoutSession[]) => {
  return [...sessions].sort(
    (firstSession, secondSession) =>
      new Date(secondSession.completedAt).getTime() -
      new Date(firstSession.completedAt).getTime(),
  );
};

const normalizeExerciseName = (exerciseName: string) => {
  return exerciseName.trim().toLowerCase();
};

export const getWorkoutSessions = (): WorkoutSession[] => {
  if (!canUseStorage()) return [];

  const rawSessions = window.localStorage.getItem(WORKOUT_SESSIONS_STORAGE_KEY);
  if (!rawSessions) return [];

  try {
    const parsedSessions: unknown = JSON.parse(rawSessions);

    if (!Array.isArray(parsedSessions)) return [];

    return sortSessionsByCompletedAtDesc(
      parsedSessions.filter(isWorkoutSession),
    );
  } catch {
    return [];
  }
};

export const saveWorkoutSessions = (sessions: WorkoutSession[]) => {
  if (!canUseStorage()) return;

  window.localStorage.setItem(
    WORKOUT_SESSIONS_STORAGE_KEY,
    JSON.stringify(sortSessionsByCompletedAtDesc(sessions)),
  );
};

export const saveWorkoutSession = (session: WorkoutSession) => {
  const sessions = getWorkoutSessions();
  const existingSessionIndex = sessions.findIndex(
    (existingSession) => existingSession.id === session.id,
  );

  if (existingSessionIndex >= 0) {
    const nextSessions = [...sessions];
    nextSessions[existingSessionIndex] = session;
    saveWorkoutSessions(nextSessions);
    return;
  }

  saveWorkoutSessions([session, ...sessions]);
};

export const clearWorkoutSessions = () => {
  if (!canUseStorage()) return;

  window.localStorage.removeItem(WORKOUT_SESSIONS_STORAGE_KEY);
};

export const getExerciseHistory = (exerciseName: string): ExerciseLog[] => {
  const normalizedExerciseName = normalizeExerciseName(exerciseName);

  return getWorkoutSessions().flatMap((session) =>
    session.exercises.filter(
      (exercise) =>
        exercise.completed &&
        normalizeExerciseName(exercise.exerciseName) === normalizedExerciseName,
    ),
  );
};

export const getLatestExercisePerformance = (
  exerciseName: string,
): ExerciseLog | null => {
  return getExerciseHistory(exerciseName)[0] ?? null;
};

