import { z } from "zod";
import { LoginModel } from "../models/LoginModel";

export const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rememberMe: z.boolean().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;
