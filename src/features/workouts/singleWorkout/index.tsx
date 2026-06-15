"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const SingleWorkout = ({ id }: { id: string }) => {
  const [exercises, setExercises] = useState<any>(null);
  const [userWorkoutData, setUserWorkoutData] = useState<{
    exerciseId: string;
    sets: string;
    reps: string;
    weight: string;
  }>({
    exerciseId: "",
    sets: "",
    reps: "",
    weight: "",
  });
  const [openedExercise, setOpenedExercise] = useState<number | null>(0);

  useEffect(() => {
    if (id) {
      const workoutPlans = JSON.parse(
        localStorage.getItem(`workoutPlan`) || "{}",
      );
      setExercises(workoutPlans?.days[id]?.exercises);
    }
  }, [id]);

  const postOngoingExerciseData = (exerciseId: number) => {
    const payload = {
      exerciseId: exerciseId,
      sets: userWorkoutData.sets,
      reps: userWorkoutData.reps,
      weight: userWorkoutData.weight,
      completedAt: new Date().toISOString(),
    };
    setExercises((prev: any) => {
      const temp = [...prev];
      temp[exerciseId].userWorkoutData = payload;
      return temp;
    });
    setOpenedExercise(exerciseId + 1);
    setUserWorkoutData({
      exerciseId: "",
      sets: "",
      reps: "",
      weight: "",
    });
  };

  const updateWorkoutPlan = () => {
    const workoutPlans = JSON.parse(
      localStorage.getItem(`workoutPlan`) || "{}",
    );
    workoutPlans.days[id].exercises = exercises;
    console.log("workoutPlans", workoutPlans);
    localStorage.setItem(`workoutPlan`, JSON.stringify(workoutPlans));
  };

  useEffect(() => {
    updateWorkoutPlan();
  }, [exercises, id]);

  console.log("exercises", exercises);

  const renderSets = (exercise: any) => {
    return (
      <>
        <ToggleGroup
          type="single"
          value={userWorkoutData?.sets?.toString()}
          onValueChange={(value: string) =>
            setUserWorkoutData({
              ...userWorkoutData,
              sets: value,
            })
          }
        >
          {Array.from({ length: exercise?.sets }, (_, i) => i + 1).map(
            (set) => (
              <ToggleGroupItem
                className="data-[state=off]:border-2 border-gray-300 data-[state=on]:text-white"
                key={set}
                value={set.toString()}
              >
                {set}
              </ToggleGroupItem>
            ),
          )}
        </ToggleGroup>
      </>
    );
  };

  return (
    <div>
      <Card className="border-2 border-solid p-3 my-2">
        <CardHeader>
          <CardTitle>Day {id}</CardTitle>
        </CardHeader>
        <CardContent>
          {exercises?.map((exercise: any, index: number) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center my-2 w-full mx-auto border-2 rounded-md p-3"
              >
                <Collapsible
                  className="rounded-md data-[state=open]:bg-white"
                  open={openedExercise === index}
                  onOpenChange={(e) => setOpenedExercise(e ? index : null)}
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="group w-full">
                      {exercise?.name}
                      <ChevronDown className="ml-auto group-data-[state=open]:rotate-180" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
                    <div>{exercise?.note || "N/A"}</div>
                    <div>Sets: </div>
                    {renderSets(exercise)}
                    <div>Reps: </div>
                    <ToggleGroup
                      type="single"
                      value={userWorkoutData?.reps?.toString()}
                      onValueChange={(value: string) =>
                        setUserWorkoutData({
                          ...userWorkoutData,
                          reps: value,
                        })
                      }
                    >
                      <ToggleGroupItem value={exercise?.reps?.toString()}>
                        {exercise?.reps}
                      </ToggleGroupItem>
                    </ToggleGroup>
                    <div>Weights:</div>
                    <ToggleGroup
                      type="single"
                      value={userWorkoutData?.weight?.toString()}
                      onValueChange={(value: string) =>
                        setUserWorkoutData({
                          ...userWorkoutData,
                          weight: value,
                        })
                      }
                    >
                      <ToggleGroupItem
                        value={exercise?.weight?.toString() || "10-20kg"}
                      >
                        {exercise?.weight || "10-20kg"}
                      </ToggleGroupItem>
                    </ToggleGroup>
                    <Button
                      size="xs"
                      onClick={() => postOngoingExerciseData(index)}
                    >
                      <Check />
                    </Button>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleWorkout;
