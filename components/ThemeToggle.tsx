"use client";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <span>🌞</span>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle dark mode"
      />
      <span>🌙</span>
    </div>
  );
}
