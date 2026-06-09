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

  useEffect(() => {
    if (id) {
      const workoutPlans = JSON.parse(
        localStorage.getItem(`workoutPlan`) || "{}",
      );
      setExercises(workoutPlans?.days[id]?.exercises);
    }
  }, [id]);

  const renderSets = (exercise: any) => {
    return (
      <>
        <ToggleGroup type="single">
          {Array.from({ length: exercise?.sets }, (_, i) => i + 1).map(
            (set) => (
              <ToggleGroupItem
                className="data-[state=on]:bg-green-300 data-[state=on]:text-white"
                key={set}
                value={`set-${set}`}
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
                <Collapsible className="rounded-md data-[state=open]:bg-white">
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
                    <ToggleGroup type="single">
                      <ToggleGroupItem value="reps">
                        {exercise?.reps}
                      </ToggleGroupItem>
                    </ToggleGroup>
                    <Button size="xs">
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
