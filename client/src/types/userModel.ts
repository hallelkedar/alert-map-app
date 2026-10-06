export interface User {
  id: string;
  username: string;
  email: string;
  role: "arena_user" | "general_user" | "admin";
  assignedArena: "North" | "South" | "Center" | "All";
}
