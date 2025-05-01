import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../../contexts/AuthContext";
import {
    ForgotPasswordFormData,
    forgotPasswordSchema,
} from "../validation/forgotPasswordSchema";

export function useForgotPasswordViewModel() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { forgotPassword } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            setError("");
            setSuccess("");
            await forgotPassword(data.email);
            setSuccess(
                "Password reset instructions have been sent to your email."
            );
        } catch {
            setError("Failed to reset password. Please try again.");
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        isSubmitting,
        error,
        success,
        errors,
    };
}
