export default function Footer() {
  return (
    <footer className="text-center p-4 text-xs text-black dark:text-gray-400 bg-white dark:bg-neutral-900 border-t w-full">
      &copy; {new Date().getFullYear()} Meal Calorie Count Generator
    </footer>
  );
}
