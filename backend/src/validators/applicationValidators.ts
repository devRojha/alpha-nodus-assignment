import { z } from "zod";


export const applicationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(32, "Name must be at most 32 characters"),

  email: z.string().email("Invalid email"),

  phone: z
    .string()
    .min(10, "Phone number too short")
    .max(15, "Phone number too long"),
});
