"use client";
import { useAuthGuard } from "../../lib/useAuthGuard";
import MealForm from "../../components/MealForm";
import ResultCard from "../../components/ResultCard";
import MealHistoryTable from "../../components/MealHistoryTable";

export default function Dashboard() {
  useAuthGuard();

  return (
    <div className="w-full max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-8">
      {/* Left side: MealForm and ResultCard */}
      <div className="flex-1 flex flex-col gap-4">
        <MealForm />
        <ResultCard />
      </div>
      {/* Right side: MealHistoryTable */}
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4">Meal History</h2>
        <MealHistoryTable />
      </div>
    </div>
  );
}
