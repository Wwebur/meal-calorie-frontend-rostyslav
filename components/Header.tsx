"use client";
import Link from "next/link";
import { useAuthStore } from "../stores/authStore";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/login");
  };

  // Navigation links for reuse
  const navLinks = user ? (
    <>
      <Link href="/dashboard" onClick={() => setOpen(false)}>
        Dashboard
      </Link>
      <Button
        className="cursor-pointer"
        variant="outline"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  ) : (
    <>
      <Link href="/login" onClick={() => setOpen(false)}>
        <Button className="cursor-pointer" variant="outline">
          Login
        </Button>
      </Link>
      <Link href="/register" onClick={() => setOpen(false)}>
        <Button className="cursor-pointer">Register</Button>
      </Link>
    </>
  );

  return (
    <header className="flex justify-end items-center p-4 border-b bg-white dark:bg-neutral-900 w-full">
      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-4 items-center">
        {navLinks}
        <ThemeToggle />
      </nav>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex flex-col gap-6 px-4 py-10 w-64 h-full"
          >
            <div className="flex flex-1 flex-col gap-4">{navLinks}</div>
            <div className="w-full flex items-center justify-center">
              <ThemeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
