type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

type Range = { startMin: number; endMin: number }; // minutes from 00:00

const SCHEDULE: Record<DayKey, Range[]> = {
  mon: [{ startMin: 13 * 60, endMin: 22 * 60 }],
  tue: [{ startMin: 13 * 60, endMin: 22 * 60 }],
  wed: [{ startMin: 13 * 60, endMin: 22 * 60 }],
  thu: [{ startMin: 18 * 60 + 30, endMin: 22 * 60 }],
  fri: [{ startMin: 13 * 60, endMin: 22 * 60 }],
  sat: [{ startMin: 13 * 60, endMin: 22 * 60 }],
  sun: [{ startMin: 13 * 60, endMin: 22 * 60 }],
};

const DAY_KEYS: DayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]; // JS getDay()

function getPermNowParts(date = new Date()) {
  // Пермь: Asia/Yekaterinburg (UTC+5)
  const dtf = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Asia/Yekaterinburg",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = dtf.formatToParts(date);
  const hour = Number(parts.find(p => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find(p => p.type === "minute")?.value ?? "0");
  const weekday = parts.find(p => p.type === "weekday")?.value ?? "";

  // weekday in ru-RU short: "пн", "вт", ...
  const map: Record<string, DayKey> = {
    "пн": "mon",
    "вт": "tue",
    "ср": "wed",
    "чт": "thu",
    "пт": "fri",
    "сб": "sat",
    "вс": "sun",
  };

  const dayKey = map[weekday.toLowerCase()] ?? "mon";
  return { dayKey, minutes: hour * 60 + minute };
}

export function getShopStatus(date = new Date()) {
  const { dayKey, minutes } = getPermNowParts(date);
  const ranges = SCHEDULE[dayKey];

  const isOpen = ranges.some(r => minutes >= r.startMin && minutes < r.endMin);

  return {
    isOpen,
    label: isOpen ? "Магазин сейчас открыт" : "Магазин сейчас закрыт",
  };
}