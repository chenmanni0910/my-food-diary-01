import { useState, useRef, useCallback } from "react";
import { X, Camera, ImagePlus } from "lucide-react";
import { matchCalories } from "@/lib/foodDatabase";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: { name: string; calories: number; image: string | null }) => void;
}

export default function AddFoodModal({ open, onClose, onSave }: Props) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState<number | "">("");
  const [image, setImage] = useState<string | null>(null);
  const [matched, setMatched] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleNameChange = useCallback((val: string) => {
    setName(val);
    const result = matchCalories(val);
    if (result) {
      setCalories(result.calories);
      setMatched(result.match);
    } else {
      setMatched(null);
    }
  }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), calories: Number(calories) || 0, image });
    setName("");
    setCalories("");
    setImage(null);
    setMatched(null);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-t-3xl bg-card p-6 card-shadow sm:rounded-3xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add Meal</h2>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Image upload */}
        <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImage} />
        {image ? (
          <div className="relative mb-4">
            <img src={image} alt="Food" className="h-40 w-full rounded-2xl object-cover" />
            <button
              onClick={() => setImage(null)}
              className="absolute right-2 top-2 rounded-full bg-foreground/60 p-1 text-background"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            className="mb-4 flex h-32 w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Camera className="h-5 w-5" />
            <span className="text-sm font-medium">Add Photo</span>
          </button>
        )}

        {/* Food name */}
        <label className="mb-1 block text-sm font-medium text-muted-foreground">Food description</label>
        <input
          type="text"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder='e.g. "beef rice bowl"'
          className="mb-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-ring"
        />
        {matched && (
          <p className="mb-3 text-xs text-primary">
            Matched: <span className="font-medium capitalize">{matched}</span>
          </p>
        )}

        {/* Calories */}
        <label className="mb-1 mt-2 block text-sm font-medium text-muted-foreground">Calories (kcal)</label>
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder="0"
          className="mb-5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-ring"
        />

        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity disabled:opacity-40"
        >
          Save Meal
        </button>
      </div>
    </div>
  );
}
