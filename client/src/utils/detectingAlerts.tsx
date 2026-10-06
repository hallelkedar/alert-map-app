import { ARENAS, type Alert } from "../types/alertModel";

export const detectAttack = (alerts: Alert[], now: number): boolean => {
  const arenasUnderThreat = new Set();

  for (const alert of alerts) {
    if (alert.priority !== "Critical" || alert.status !== "Active") continue;
    if (now - new Date(alert.createdAt).getTime() > 15_000) continue;
    arenasUnderThreat.add(alert.arena);
  }

  return ARENAS.every((arena) => arenasUnderThreat.has(arena));
};
