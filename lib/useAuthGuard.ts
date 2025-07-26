import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/authStore";

export function useAuthGuard() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const restore = useAuthStore((s) => s.restore);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    restore();
    setChecked(true);
  }, [restore]);

  useEffect(() => {
    if (checked && !token) {
      router.replace("/login");
    }
  }, [checked, token, router]);
}