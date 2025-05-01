import { z } from "zod";
import { ForgotPasswordModel } from "../models/ForgotPasswordModel";

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
