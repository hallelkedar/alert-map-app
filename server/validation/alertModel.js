import { z } from "zod";

export const PRIORITIES = ["Low", "Medium", "High", "Critical"];
export const ARENAS = ["North", "South", "Center"];
export const STATUSES = ["Active", "Handled"];

export const alertSchema = z.object({
  displayName: z.string().trim().min(1).max(50),
  description: z.string().trim().min(1).max(500),
  priority: z.enum(PRIORITIES),
  arena: z.enum(ARENAS),
  status: z.enum(STATUSES),
  lon: z.number().min(-180).max(180),
  lat: z.number().min(-90).max(90),
});

export const alertUpdateSchema = alertSchema
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Need at least one field to update",
  });
