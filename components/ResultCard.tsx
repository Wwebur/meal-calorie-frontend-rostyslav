"use client";
import { useMealStore } from "../stores/mealStore";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function ResultCard() {
  const result = useMealStore((s) => s.lastResult);

  if (!result) return null;

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4">
      <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl shadow-lg rounded-xl mt-4 p-4 sm:p-8">
        <CardHeader className="text-center text-lg sm:text-xl font-bold mb-4">
          {result.dish_name}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-center gap-2">
            <div>
              <p>
                Servings: &nbsp;
                <span className="font-semibold">{result.servings}</span>
              </p>
              <p>
                Calories per serving: &nbsp;
                <span className="font-semibold">
                  {result.calories_per_serving}
                </span>
              </p>
              <p>
                Total calories: &nbsp;
                <span className="font-semibold">{result.total_calories}</span>
              </p>
            </div>
            <div className="text-xs text-gray-500 mt-2 md:mt-0 md:text-right">
              Source: {result.source}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
