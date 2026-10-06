import { useEffect, useMemo, useState } from "react";
import type { Alert } from "../types/alertModel";
import { detectAttack } from "../utils/detectingAlerts";

export const useCoordinatedAttack = (alerts: Alert[]): boolean => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return useMemo(() => detectAttack(alerts, now), [alerts, now]);
};
