import axios from "axios";
import type { Alert } from "../types/alertModel";

const baseUrl = `http://localhost:3000`;

const apiClient = axios.create({
    headers: {"Content-Type": "application/json"}
})

export const getAlerts = async () => {
    const res = await apiClient.get(`${baseUrl}/api/alerts`)
    return res.data
}

export const getAlert = async (id: string) => {
    const res = await apiClient.get(`${baseUrl}/api/alerts/${id}`)
    return res.data
}

export const createAlert = async (data: Alert) => {
    const res = await apiClient.post(`${baseUrl}/api/alerts`, data)
    return res.data
}

export const updateAlert = async (id: string, data: Alert) => {
    const res = await apiClient.put(`${baseUrl}/api/alerts/${id}`, data)
    return res.data
}

export const deleteAlert = async (id: string) => {
    const res = await apiClient.delete(`${baseUrl}/api/alerts/${id}`)
    return res.data
}