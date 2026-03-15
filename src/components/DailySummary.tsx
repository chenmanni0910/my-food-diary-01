import { Flame, UtensilsCrossed } from "lucide-react";
import { getMotivationalMessage } from "@/lib/motivational";
import { useMemo } from "react";

interface Props {
  totalCalories: number;
  foodCount: number;
}

export default function DailySummary({ totalCalories, foodCount }: Props) {
  const message = useMemo(() => getMotivationalMessage(totalCalories), [totalCalories]);

  return (
    <div className="rounded-2xl bg-card p-5 card-shadow">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Flame className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold tracking-tight">{totalCalories}</p>
            <p className="text-xs text-muted-foreground">kcal</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <UtensilsCrossed className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-2xl font-bold tracking-tight">{foodCount}</p>
            <p className="text-xs text-muted-foreground">meals</p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
