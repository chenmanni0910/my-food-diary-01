import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import MealCard from "@/components/MealCard";
import { getAllDays, deleteFoodEntry, type DayLog } from "@/lib/storage";

export default function HistoryPage() {
  const [days, setDays] = useState<DayLog[]>(() => getAllDays());
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleDelete = (date: string, id: string) => {
    deleteFoodEntry(date, id);
    setDays(getAllDays());
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  return (
    <div className="mx-auto min-h-screen max-w-md px-4 pb-8 pt-6">
      <div className="mb-5 flex items-center gap-3">
        <Link to="/" className="rounded-xl p-2 hover:bg-muted">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold">History</h1>
      </div>

      {days.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-4xl">📅</p>
          <p className="mt-2 text-sm text-muted-foreground">No history yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {days.map((day) => {
            const total = day.foods.reduce((s, f) => s + f.calories, 0);
            const isOpen = expanded === day.date;
            return (
              <div key={day.date} className="rounded-2xl bg-card card-shadow">
                <button
                  onClick={() => setExpanded(isOpen ? null : day.date)}
                  className="flex w-full items-center justify-between p-4"
                >
                  <div className="text-left">
                    <p className="font-semibold">{formatDate(day.date)}</p>
                    <p className="text-sm text-muted-foreground">
                      {total} kcal · {day.foods.length} meal{day.foods.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                {isOpen && (
                  <div className="space-y-2 px-4 pb-4">
                    {day.foods.map((entry) => (
                      <MealCard
                        key={entry.id}
                        entry={entry}
                        onDelete={(id) => handleDelete(day.date, id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
