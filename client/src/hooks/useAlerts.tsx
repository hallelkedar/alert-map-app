import { useEffect, useState } from "react";
import type { Alert } from "../types/alertModel";
import {
  createAlert,
  deleteAlert,
  getAlerts,
  updateAlert,
} from "../api/alertApi";

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => {
    setError(null);
  };

  const loadAlerts = async () => {
    setLoading(true);
    setError(null);
    try {
      const alertData = await getAlerts();
      setAlerts(alertData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const addAlert = async (data: Alert) => {
    setLoading(true);
    setError(null);
    try {
      const alertData = await createAlert(data);
      setAlerts((prev) => [alertData, ...prev]);
      return true;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const editAlert = async (id: string, data: Alert) => {
    setLoading(true);
    setError(null);
    try {
      await updateAlert(id, data);
      setAlerts((prev) => prev.map((a) => (a.id === id ? data : a)));
      return true;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeAlert = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const alertData = await deleteAlert(id);
      setAlerts((prev) => prev.filter((a) => a.id !== id));
      return true;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    alerts,
    loading,
    error,
    clearError,
    loadAlerts,
    addAlert,
    editAlert,
    removeAlert,
  };
};
