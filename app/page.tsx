import Image from "next/image";

export default function Home() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Welcome!</h2>
      <p>
        Please <a href="/login" className="text-blue-600 underline">Login</a> or{" "}
        <a href="/register" className="text-blue-600 underline">Register</a> to use the Meal Calorie Count Generator.
      </p>
    </div>
  );
}
