import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(3, "Name must be at least 2 characters"),

  description: z.string(),

  location: z.string().min(2, "Phone number too short"),

});
