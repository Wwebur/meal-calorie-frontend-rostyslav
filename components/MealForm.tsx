"use client";
import { useState } from "react";
import { getCalories } from "../lib/api";
import { useAuthStore } from "../stores/authStore";
import { useMealStore } from "../stores/mealStore";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { z } from "zod";

const mealSchema = z.object({
  dish_name: z.string().min(2, "Dish name is required"),
  servings: z.preprocess(
    (v) => Number(v),
    z.number().min(1, "Servings must be at least 1")
  ),
});

export default function MealForm() {
  const [form, setForm] = useState({ dish_name: "", servings: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const token = useAuthStore((s) => s.token);
  const setResult = useMealStore((s) => s.setResult);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors((prev) => {
      const { [e.target.name]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setLoading(true);

    // Zod validation
    const result = mealSchema.safeParse(form);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) errors[err.path[0] as string] = err.message;
      });
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const { data } = await getCalories(
        { dish_name: form.dish_name, servings: Number(form.servings) },
        token!
      );
      setResult(data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full px-2">
      <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl shadow-lg rounded-xl p-4 sm:p-8">
        <CardHeader className="text-center text-xl sm:text-2xl font-bold mb-2">
          Calorie Lookup
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Input
              name="dish_name"
              placeholder="Dish Name"
              value={form.dish_name}
              onChange={handleChange}
              required
            />
            {fieldErrors.dish_name && (
              <p className="text-red-500 text-xs">{fieldErrors.dish_name}</p>
            )}
            <Input
              name="servings"
              type="number"
              min={1}
              placeholder="Servings"
              value={form.servings}
              onChange={handleChange}
              required
            />
            {fieldErrors.servings && (
              <p className="text-red-500 text-xs">{fieldErrors.servings}</p>
            )}
            <Button type="submit" className="w-full py-2 cursor-pointer" disabled={loading}>
              {loading ? "Loading..." : "Get Calories"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
