const messages = {
  low: [
    "Great start! Keep fueling your body 🌱",
    "Light day so far — don't forget to eat well!",
    "You're doing great, stay balanced 💚",
  ],
  mid: [
    "Nicely balanced day! Keep it up 🙌",
    "You're on track — solid choices today!",
    "Good balance of meals so far 👍",
  ],
  high: [
    "You've eaten enough today. Maybe skip the midnight snack 🙂",
    "That's quite a feast! Time to relax and digest 🍃",
    "Full tank! Maybe go for a walk? 🚶",
    "You've had a generous day — enjoy it guilt-free! ✨",
  ],
};

export function getMotivationalMessage(totalCalories: number): string {
  const tier = totalCalories < 800 ? "low" : totalCalories < 1800 ? "mid" : "high";
  const list = messages[tier];
  return list[Math.floor(Math.random() * list.length)];
}
