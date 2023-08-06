import {z} from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  name: z
    .string()
    .min(3, {message: "Name should contain at least 3 characters"})
    .max(55),
  password: z.string().min(6).max(100),
  comfirmPassword: z.string().min(6).max(100),
});

export const LoginSchema = z.object({
  password: z.string().min(6).max(100),
  email: z.string().email(),
});
