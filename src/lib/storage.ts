export interface FoodEntry {
  id: string;
  time: string;
  name: string;
  calories: number;
  image: string | null;
}

export interface DayLog {
  date: string;
  foods: FoodEntry[];
}

const STORAGE_KEY = "foodlog_data";

function getAllLogs(): DayLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLogs(logs: DayLog[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function getDayLog(date: string): DayLog {
  const logs = getAllLogs();
  return logs.find((l) => l.date === date) || { date, foods: [] };
}

export function addFoodEntry(entry: Omit<FoodEntry, "id" | "time">): FoodEntry {
  const logs = getAllLogs();
  const today = getTodayString();
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const newEntry: FoodEntry = {
    ...entry,
    id: crypto.randomUUID(),
    time,
  };

  const dayIndex = logs.findIndex((l) => l.date === today);
  if (dayIndex >= 0) {
    logs[dayIndex].foods.push(newEntry);
  } else {
    logs.push({ date: today, foods: [newEntry] });
  }

  saveLogs(logs);
  return newEntry;
}

export function deleteFoodEntry(date: string, entryId: string) {
  const logs = getAllLogs();
  const dayIndex = logs.findIndex((l) => l.date === date);
  if (dayIndex >= 0) {
    logs[dayIndex].foods = logs[dayIndex].foods.filter((f) => f.id !== entryId);
    if (logs[dayIndex].foods.length === 0) {
      logs.splice(dayIndex, 1);
    }
    saveLogs(logs);
  }
}

export function getAllDays(): DayLog[] {
  return getAllLogs().sort((a, b) => b.date.localeCompare(a.date));
}
