import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../../contexts/AuthContext";
import {
    ForgotPasswordFormData,
    forgotPasswordSchema,
} from "../validation/forgotPasswordSchema";

export function useForgotPasswordViewModel() {
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
            await forgotPassword(data.email);
            toast.success("Email de recuperação enviado com sucesso");
        } catch {
            toast.error("Falha ao enviar email de recuperação");
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        isSubmitting,
        errors,
    };
}
