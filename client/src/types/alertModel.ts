export const PRIORITIES = ["Low", "Medium", "High", "Critical"];
export const ARENAS = ["North", "South", "Center"];
export const STATUSES = ["Active", "Handled"];

export interface AlertInput {
  displayName: string;
  description: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  arena: "North" | "South" | "Center";
  status: "Active" | "Handled";
  lon: number;
  lat: number;
  createdAt: string
}

export interface Alert extends AlertInput {
  id: string;
}