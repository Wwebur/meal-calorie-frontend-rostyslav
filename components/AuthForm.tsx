"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { register, login } from "../lib/api";
import { useAuthStore } from "../stores/authStore";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { z } from "zod";

const registerSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AuthForm() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const pathname = usePathname();
  const setAuth = useAuthStore((s) => s.setAuth);

  const isRegister = pathname === "/register";

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
    const schema = isRegister ? registerSchema : loginSchema;
    const data = isRegister
      ? form
      : { email: form.email, password: form.password };
    const result = schema.safeParse(data);

    if (!result.success) {
      // Collect field errors
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) errors[err.path[0] as string] = err.message;
      });
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    try {
      if (isRegister) {
        await register(form);
        const { data } = await login({
          email: form.email,
          password: form.password,
        });
        setAuth(data.user, data.token);
      } else {
        const { data } = await login({
          email: form.email,
          password: form.password,
        });
        setAuth(data.user, data.token);
      }
      router.push("/dashboard");
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
    <div className="flex justify-center items-center h-full w-full px-2">
      <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl shadow-lg rounded-xl p-4 sm:p-8">
        <CardHeader className="text-center text-2xl sm:text-3xl font-bold mb-4">
          {isRegister ? "Register" : "Login"}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {isRegister && (
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    name="first_name"
                    placeholder="First Name"
                    value={form.first_name}
                    onChange={handleChange}
                    required
                  />
                  {fieldErrors.first_name && (
                    <p className="text-red-500 text-xs">
                      {fieldErrors.first_name}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    name="last_name"
                    placeholder="Last Name"
                    value={form.last_name}
                    onChange={handleChange}
                    required
                  />
                  {fieldErrors.last_name && (
                    <p className="text-red-500 text-xs">
                      {fieldErrors.last_name}
                    </p>
                  )}
                </div>
              </div>
            )}
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-xs">{fieldErrors.email}</p>
            )}
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-xs">{fieldErrors.password}</p>
            )}
            <Button
              type="submit"
              className="w-full py-3 text-lg cursor-pointer"
              disabled={loading}
            >
              {loading ? "Loading..." : isRegister ? "Register" : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
