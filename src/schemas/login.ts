import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(255, "Email must be at most 255 characters")
    .email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .refine((value) => !value.match(/^\s+$/), {
      message: "Password cannot be only whitespace",
    }),
});
