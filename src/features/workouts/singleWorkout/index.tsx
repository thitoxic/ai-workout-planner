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
import { useRouter } from "next/navigation";
import { Exercise, UserWorkoutData } from "@/types/workout";
import "./singleWorkout.css";
import { Input } from "@/components/ui/input";

const SingleWorkout = ({ id }: { id: string }) => {
  const router = useRouter();
  const [exercises, setExercises] = useState<Exercise[] | null>(null);
  const [userWorkoutData, setUserWorkoutData] = useState<UserWorkoutData>({
    exerciseId: 1,
    sets: "",
    reps: "",
    weights: "",
    completedAt: "",
  });
  const [openedExercise, setOpenedExercise] = useState<number | null>(0);

  useEffect(() => {
    if (id) {
      const workoutPlans = JSON.parse(
        localStorage.getItem(`workoutPlan`) || "{}",
      );
      const currentDay = workoutPlans?.days?.find(
        (day: any) => day.id === Number(id),
      );
      setExercises(currentDay?.exercises || null);
    }
  }, [id]);

  const postOngoingExerciseData = (exerciseId: number) => {
    if (!exercises) return;

    const payload = {
      exerciseId: exerciseId,
      sets: userWorkoutData.sets,
      reps: userWorkoutData.reps,
      weights: userWorkoutData.weights,
      completedAt: new Date().toISOString(),
    };

    const updatedExercises = [...exercises];
    updatedExercises[exerciseId] = {
      ...updatedExercises[exerciseId],
      userWorkoutData: payload,
    };
    setExercises(updatedExercises);
    updateWorkoutPlan(updatedExercises);
    const isLastExercise = exerciseId === exercises.length - 1;
    if (isLastExercise) {
      completeWorkoutDay();

      router.push("/workouts");
    } else {
      setOpenedExercise(exerciseId + 1);
    }
    setUserWorkoutData({
      exerciseId: 1,
      sets: "",
      reps: "",
      weights: "",
      completedAt: "",
    });
  };

  const updateWorkoutPlan = (updatedExercises: Exercise[]) => {
    const workoutPlans = JSON.parse(
      localStorage.getItem(`workoutPlan`) || "{}",
    );

    const dayIndex = workoutPlans?.days?.findIndex(
      (day: any) => day.id === Number(id),
    );
    if (dayIndex !== -1) {
      workoutPlans.days[dayIndex].exercises = updatedExercises;
      localStorage.setItem(`workoutPlan`, JSON.stringify(workoutPlans));
    }
  };

  const completeWorkoutDay = () => {
    const workoutPlans = JSON.parse(
      localStorage.getItem("workoutPlan") || "{}",
    );
    workoutPlans.days[Number(id) - 1].completedAt = new Date().toISOString();
    localStorage.setItem("workoutPlan", JSON.stringify(workoutPlans));
  };

  const renderSets = (exercise: Exercise) => {
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
          {exercises?.map((exercise: Exercise, index: number) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center my-2 w-full mx-auto border-2 rounded-md p-3"
              >
                <Collapsible
                  className="rounded-md w-100 data-[state=open]:bg-white"
                  open={openedExercise === index}
                  onOpenChange={(e) => setOpenedExercise(e ? index : null)}
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="group w-full h-12">
                      {exercise?.name}
                      <ChevronDown className="ml-auto group-data-[state=open]:rotate-180" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="flex flex-col font-bold items-start gap-2 p-2.5 pt-2 text-sm">
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
                      value={userWorkoutData?.weights?.toString()}
                      onValueChange={(value: string) =>
                        setUserWorkoutData({
                          ...userWorkoutData,
                          weights: value,
                        })
                      }
                    >
                      <ToggleGroupItem
                        value={exercise?.weights?.toString() || "10-20kg"}
                      >
                        {exercise?.weights || "10-20kg"}
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="custom"
                      >
                        Customized
                      </ToggleGroupItem>
                      {userWorkoutData?.weights === "custom" && (
                        <Input
                          type="text"
                          placeholder="Enter custom weight"
                          value={""}
                          onChange={(e) =>
                            setUserWorkoutData({
                              ...userWorkoutData,
                              weights: e.target.value,
                            })
                          }
                        />
                      )}
                    </ToggleGroup>
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={() => postOngoingExerciseData(index)}
                    >
                      {openedExercise === exercises.length - 1 ? (
                        <>
                          <Check />
                          Complete
                        </>
                      ) : (
                        <Check />
                      )}
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
