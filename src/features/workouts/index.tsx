"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { WorkoutDay, WorkoutPlan } from "@/types/workout";

const Workouts = () => {
  const router = useRouter();
  const workoutPlan =
    typeof window !== "undefined" ? localStorage.getItem("workoutPlan") : null;
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan | null>(null);
  const resetWorkout = () => {
    localStorage.removeItem("workoutPlan");
    router.push("/");
  };

  const renderTextOnCompletedAt = (completedAt: string | undefined) => {
    if (dayjs(completedAt).isValid()) {
      if (dayjs().diff(dayjs(completedAt), "day") > 7) {
        return "(Completed)";
      }
    }
    return "";
  };

  const getLatestWorkoutDayId = () => {
    const nextDayIndex = workoutPlans?.days?.findIndex(
      (day: WorkoutDay) => !day?.completedAt,
    );

    if (nextDayIndex === -1 || nextDayIndex === undefined) {
      return 1;
    }

    return nextDayIndex + 1;
  };

  useEffect(() => {
    if (!workoutPlan) {
      router.push("/");
    }
    setWorkoutPlans(JSON.parse(workoutPlan || "{}"));
  }, []);
  const renderWorkoutPlan = () => {
    if (workoutPlans) {
      return (
        <Card
          className="border-2 border-solid p-3 my-2"
          key={workoutPlans.planName}
        >
          <CardHeader className="">{workoutPlans.planName}</CardHeader>
          <CardDescription className="">
            {workoutPlans?.days?.map((day: WorkoutDay) => {
              return (
                <div
                  key={day?.day}
                  className="flex flex-column justify-center my-2 w-full mx-auto border-2 rounded-md p-3"
                >
                  <p>
                    {day?.day} {renderTextOnCompletedAt(day?.completedAt)}
                  </p>
                </div>
              );
            })}
          </CardDescription>
          <Button
            onClick={() => router.push(`/workouts/${getLatestWorkoutDayId()}`)}
          >
            Start Workout for Day {getLatestWorkoutDayId()}
          </Button>
        </Card>
      );
    }
  };

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Workout Plan</CardTitle>
          <CardDescription>Your personalized workout plan</CardDescription>
        </CardHeader>
        <CardContent>
          {renderWorkoutPlan()}
          <div className="mt-6">
            <Button
              variant={"outline"}
              className="w-full"
              onClick={() => {
                resetWorkout();
              }}
            >
              Regenrate Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Workouts;
