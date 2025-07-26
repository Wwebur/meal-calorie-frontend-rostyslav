# Meal Calorie Count Generator – Frontend

A React/Next.js-based frontend for the Meal Calorie Count Generator. This interface allows users to register/login, calculate meal calories, and view their meal history. It communicates with a backend API that processes USDA FoodData Central data.

---

## **1. Setup Instructions**

### **Prerequisites**

* **Node.js** (v16 or later)
* **npm** or **yarn**

### **Steps**

1. **Clone the repository**

   ```bash
   git clone https://github.com/Wwebur/meal-calorie-frontend-rostyslav.git
   cd meal-calorie-frontend-rostyslav
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env.local` file**
   Add environment variables:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

---

## **2. Key Components**

* **`AuthForm.tsx`** – Handles login and registration with validation via Zod.
* **`MealForm.tsx`** – Accepts dish name and servings to calculate calories.
* **`ResultCard.tsx`** – Displays calorie calculation results.
* **`MealHistoryTable.tsx`** – Shows user meal history.
* **`useAuthGuard.ts`** – Protects routes by checking authentication.
* **Zustand Stores:** `authStore.ts`, `mealStore.ts`and `mealHistoryStore.ts` manage app state.

---

## **3. Design & Trade-offs**

* **Next.js** chosen for ease of SSR and static optimizations.
* **shadcn/ui** used as the component library for a clean, modern, and accessible UI, combined with Tailwind CSS for customization.
* **Zod** for form validation, providing TypeScript support and runtime schema validation.
* **Zustand** selected over Redux for simplicity and minimal boilerplate.
* **Trade-off:** Limited offline support – can add caching/PWA support later.

---

## **4. Screenshots**

![Login Page](./images/login.png)
![Register Page](./images/register.png)
![Dashboard](./images/dashboard.png)
![Result Card](./images/result_card.png)
![Meal History](./images/meal_history.png)