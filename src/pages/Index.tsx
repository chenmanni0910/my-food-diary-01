import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Plus, History } from "lucide-react";
import DailySummary from "@/components/DailySummary";
import MealCard from "@/components/MealCard";
import AddFoodModal from "@/components/AddFoodModal";
import { getDayLog, getTodayString, addFoodEntry, deleteFoodEntry, type FoodEntry } from "@/lib/storage";

export default function Index() {
  const today = getTodayString();
  const [foods, setFoods] = useState<FoodEntry[]>(() => getDayLog(today).foods);
  const [modalOpen, setModalOpen] = useState(false);

  const totalCalories = foods.reduce((s, f) => s + f.calories, 0);

  const handleSave = useCallback(
    (data: { name: string; calories: number; image: string | null }) => {
      const entry = addFoodEntry(data);
      setFoods((prev) => [...prev, entry]);
    },
    []
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteFoodEntry(today, id);
      setFoods((prev) => prev.filter((f) => f.id !== id));
    },
    [today]
  );

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto min-h-screen max-w-md px-4 pb-24 pt-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">FoodLog</h1>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
        <Link
          to="/history"
          className="flex items-center gap-1.5 rounded-xl bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
        >
          <History className="h-4 w-4" />
          History
        </Link>
      </div>

      {/* Summary */}
      <DailySummary totalCalories={totalCalories} foodCount={foods.length} />

      {/* Timeline */}
      <div className="mt-6 space-y-3">
        {foods.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-4xl">🥗</p>
            <p className="mt-2 text-sm text-muted-foreground">No meals logged yet today</p>
            <p className="text-xs text-muted-foreground">Tap + to add your first meal</p>
          </div>
        ) : (
          foods.map((entry) => (
            <MealCard key={entry.id} entry={entry} onDelete={handleDelete} />
          ))
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground fab-shadow transition-transform hover:scale-105 active:scale-95"
      >
        <Plus className="h-6 w-6" />
      </button>

      <AddFoodModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} />
    </div>
  );
}
