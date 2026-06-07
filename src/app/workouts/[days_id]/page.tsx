import SingleWorkout from "@/features/workouts/singleWorkout";
import "../../globals.css";

const Workout = async ({ params }: { params: { days_id: string } }) => {
  const { days_id } = await params;
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SingleWorkout id={days_id} />
    </div>
  );
};

export default Workout;
