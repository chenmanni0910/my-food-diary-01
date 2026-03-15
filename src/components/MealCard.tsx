import { Trash2 } from "lucide-react";
import type { FoodEntry } from "@/lib/storage";

interface Props {
  entry: FoodEntry;
  onDelete: (id: string) => void;
}

export default function MealCard({ entry, onDelete }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-card p-3 card-shadow">
      {entry.image ? (
        <img
          src={entry.image}
          alt={entry.name}
          className="h-16 w-16 shrink-0 rounded-xl object-cover"
        />
      ) : (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-muted text-2xl">
          🍽️
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium capitalize">{entry.name}</p>
        <p className="text-sm text-muted-foreground">{entry.calories} kcal</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-xs text-muted-foreground">{entry.time}</span>
        <button
          onClick={() => onDelete(entry.id)}
          className="rounded-lg p-1.5 text-muted-foreground/50 transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
