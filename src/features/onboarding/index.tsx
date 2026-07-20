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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { WorkoutApiResponse } from "@/types/workout";

const Onboarding = () => {
  const router = useRouter();
  const [details, setDetails] = useState<{
    goal: string;
    noOfDays: number[];
    equipments: string[];
    weights: string[];
  }>({
    goal: "general-fitness",
    noOfDays: [3],
    equipments: [],
    weights: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitDetails = async () => {
    setIsLoading(true);
    const response = await fetch("/api/workout", {
      method: "POST",
      body: JSON.stringify(details),
    });
    const data = (await response.json()) as WorkoutApiResponse;
    localStorage.setItem("workoutPlan", data.workoutPlan);
    router.push("/workouts");
    setIsLoading(false);
  };

  useEffect(() => {
    const data = localStorage.getItem("workoutPlan");
    if (data) {
      router.push("/workouts");
    }
  }, []);

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Start your fitness journey!</CardTitle>
          <CardDescription>
            Answer a few questions to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="goal">What is your Primary Goal?</Label>
            <Select
              value={details?.goal}
              onValueChange={(val) => setDetails({ ...details, goal: val })}
            >
              <SelectTrigger className="w-full mt-3">
                <SelectValue placeholder="Select a goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weight-loss">Weight Loss</SelectItem>
                <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                <SelectItem value="flexibility">Flexibility</SelectItem>
                <SelectItem value="endurance">Endurance</SelectItem>
                <SelectItem value="general-fitness">General Fitness</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="noOfDays">
                How many days a week do you want to work out?
              </Label>
              <span className="text-sm text-muted-foreground">
                {details?.noOfDays}
              </span>
            </div>
            <Slider
              id="noOfDays"
              min={1}
              max={7}
              step={1}
              value={details?.noOfDays}
              onValueChange={(val: number[]) =>
                setDetails({ ...details, noOfDays: val })
              }
              className="w-full mt-3"
            />
          </div>
          <div className="mt-6">
            <Label htmlFor="equipments">
              What equipment do you have access to?
            </Label>
            <div>
              <ToggleGroup
                className="grid grid-cols-3 mt-2"
                type="multiple"
                value={details?.equipments}
                onValueChange={(val: string[]) =>
                  setDetails({ ...details, equipments: val })
                }
              >
                <ToggleGroupItem className="col-span-1" value="barbell">🏋️ Barbell</ToggleGroupItem>
                <ToggleGroupItem className="col-span-2" value="dumbbell">💪 Dumbbells</ToggleGroupItem>
                <ToggleGroupItem className="col-span-2"value="cables">🔗 Cables</ToggleGroupItem>
                <ToggleGroupItem className="col-span-1" value="machines">🤖 Machines</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
          <div className="mt-6">
            <Label htmlFor="weights">How much can you lift?</Label>
            <div className="flex items-center justify-center">
              <ToggleGroup
                className="grid grid-cols-2 mt-2"
                type="multiple"
                value={details?.weights}
                onValueChange={(val: string[]) =>
                  setDetails({ ...details, weights: val })
                }
              >
                <ToggleGroupItem value="beginner">{`Beginner < 60kg`}</ToggleGroupItem>
                <ToggleGroupItem value="novice">{`Novice 60-90kg`}</ToggleGroupItem>
                <ToggleGroupItem className="col-span-2" value="intermediate">{`Intermediate 90-120kg`}</ToggleGroupItem>
                <ToggleGroupItem className="col-span-2" value="advanced">{`Advanced > 120kg`}</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
          <div className="mt-6">
            <Button
              className="w-full"
              onClick={() => {
                submitDetails();
              }}
            >
              {isLoading ? "Generating..." : `Generate Workout Plan`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Onboarding;
