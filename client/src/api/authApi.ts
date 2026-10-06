import axios from "axios";
import { apiClient } from "./alertApi";
import type { User } from "../types/userModel";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error ?? error.message;
  }
  return error instanceof Error ? error.message : "Unknown error";
};

export const registerUser = async (data: User): Promise<string> => {
  const res = await apiClient.post("/api/auth/register", data);
  return res.data.token;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<string> => {
  const res = await apiClient.post("/api/auth/login", data);
  return res.data.token;
};

export const getProfile = async (): Promise<User> => {
  const res = await apiClient.get("/api/auth/me");
  return res.data.user;
};

export const getUserById = async (id: string) => {
  const res = await apiClient.get(`api/auth/users/${id}`);
  return res.data.user;
};

export const getAllUsers = async () => {
  const res = await apiClient.get("/api/auth/users");
  return res.data.users;
};

export const deleteUser = async (id: string) => {
  const res = await apiClient.delete(`/api/auth/users/${id}`);
  return res.data.user;
};
