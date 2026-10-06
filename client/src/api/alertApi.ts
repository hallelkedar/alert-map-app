import axios from "axios";
import type { Alert, AlertInput } from "../types/alertModel";
import { useAuthStore } from "../store/authStore";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const toAlert = ({ _id, ...rest }): Alert => ({
  id: _id,
  ...rest,
});

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error ?? error.message;
  }
  return error instanceof Error ? error.message : "Unknown error";
};

export const getAlerts = async (): Promise<Alert[]> => {
  const res = await apiClient.get<{ alerts: ServerAlert[] }>("/api/alerts");
  return res.data.alerts.map(toAlert);
};

export const getAlert = async (id: string): Promise<Alert> => {
  const res = await apiClient.get<{ alert: ServerAlert }>(`/api/alerts/${id}`);
  return toAlert(res.data.alert);
};

export const createAlert = async (data: AlertInput): Promise<Alert> => {
  const res = await apiClient.post<{ alert: ServerAlert }>("/api/alerts", data);
  return toAlert(res.data.alert);
};

export const updateAlert = async (
  id: string,
  data: Partial<AlertInput>,
): Promise<Alert> => {
  const res = await apiClient.put<{ alert: ServerAlert }>(
    `/api/alerts/${id}`,
    data,
  );
  return toAlert(res.data.alert);
};

export const deleteAlert = async (id: string): Promise<Alert> => {
  const res = await apiClient.delete<{ alert: ServerAlert }>(
    `/api/alerts/${id}`,
  );
  return toAlert(res.data.alert);
};
