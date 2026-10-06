import { z } from "zod";

export const ROLEs = ["arena_user", "general_user", "admin"];
export const AssignedArena = ["North", "South", "Center", "All"];

export const userSchema = z.object({
  username: z.string().trim().min(1).max(50),
  password: z.string().trim().min(8).max(20),
  email: z.email(),
  role: z.enum(ROLEs),
  assignedArena: z.enum(AssignedArena),
});
