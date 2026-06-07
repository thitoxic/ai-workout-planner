"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

const SingleWorkout = ({ id }: { id: string }) => {
  const [exercises, setExercises] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const workoutPlans = JSON.parse(
        localStorage.getItem(`workoutPlan`) || "{}",
      );
      setExercises(workoutPlans?.days[id]?.exercises);
    }
  }, [id]);

  return (
    <div>
      <Card className="border-2 border-solid p-3 my-2">
        <CardHeader>
          <CardTitle>Sample</CardTitle>
        </CardHeader>
        <CardContent>
          {exercises?.map((exercise: any, index: number) => {
            return (
              <div
                key={index}
                className="flex flex-column justify-center my-2 w-full mx-auto border-2 rounded-md p-3"
              >
                <p>{exercise?.name}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleWorkout;
