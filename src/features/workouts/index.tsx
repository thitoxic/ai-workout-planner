"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Workouts = () => {
  const router = useRouter();
  const workoutPlan =
    typeof window !== "undefined" ? localStorage.getItem("workoutPlan") : null;
  const [currentPlan, setCurrentPlan] = useState<any>(null);
  const resetWorkout = () => {
    localStorage.removeItem("workoutPlan");
    router.push("/");
  };

  useEffect(() => {
    if (!workoutPlan) {
      router.push("/");
    }
    setCurrentPlan(JSON.parse(workoutPlan || "{}"));
  }, []);
  const renderWorkoutPlan = () => {
    if (currentPlan) {
      return currentPlan?.days?.map((day: any) => {
        return (
          <div key={day?.day}>
            {day?.exercises?.map((exercise: any) => {
              return (
                <div key={exercise.name}>
                  <Label>{exercise.name}</Label>
                  <p>{exercise.sets}</p>
                  <p>{exercise.reps}</p>
                  <p>{exercise.note}</p>
                </div>
              );
            })}
          </div>
        );
      });
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
