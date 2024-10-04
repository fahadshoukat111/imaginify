import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(2).max(50),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string().optional(),
  });