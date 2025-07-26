"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { useMealHistoryStore } from "../stores/mealHistoryStore";
import { getMealHistory } from "../lib/api";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "../components/ui/table";

export default function MealHistoryTable() {
  const token = useAuthStore((s) => s.token);
  const { history, setHistory } = useMealHistoryStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getMealHistory(token)
      .then((res) => setHistory(res.data))
      .finally(() => setLoading(false));
  }, [token, setHistory]);

  if (loading) return <div>Loading...</div>;
  if (!history.length) return <div>No meal history yet.</div>;

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[500px]">
        <TableHeader>
          <TableRow>
            <TableCell>Dish</TableCell>
            <TableCell>Servings</TableCell>
            <TableCell>Calories/Serving</TableCell>
            <TableCell>Total Calories</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((meal, idx) => (
            <TableRow key={idx}>
              <TableCell className="text-center">{meal.dish_name}</TableCell>
              <TableCell className="text-center">{meal.servings}</TableCell>
              <TableCell className="text-center">{meal.calories_per_serving}</TableCell>
              <TableCell className="text-center">{meal.total_calories}</TableCell>
              <TableCell className="text-center">
                {meal.date ? new Date(meal.date).toLocaleString() : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
