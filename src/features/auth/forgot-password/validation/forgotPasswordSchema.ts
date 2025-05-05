import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z.string().email("Endereço de email inválido"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
