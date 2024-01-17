import { z } from "zod";

export const ChildSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
  dateOfBirth: z
    .object({
      year: z.number(),
      month: z.number(),
      date: z.number(),
    })
    .optional(),
});

export type Child = z.infer<typeof ChildSchema>;
