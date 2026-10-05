import z from "zod";

export const alertSchema = z.object({
  displayName: z.string(),
  description: z.string(),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),
  arena: z.string(["North", "South", "Center"]),
  status: z.string(["Active", "Handled"]),
  lon: z.number(),
  lat: z.number(),
});
