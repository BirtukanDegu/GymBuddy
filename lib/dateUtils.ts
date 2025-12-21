
export function getCurrentDateInfo() {
  const today = new Date();
  return {
    day: today.getDate(),
    month: today.toLocaleString("default", { month: "long" }),
    year: today.getFullYear(),
    date: today,
  };
}

export function getDaysInMonth(date: Date = new Date()): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getFirstDayOfMonth(date: Date = new Date()): number {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

export function getWeekDayLabels(): string[] {
  return ["M", "T", "W", "T", "F", "S", "S"];
}
