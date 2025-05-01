import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../../contexts/AuthContext";
import { LoginFormData, loginSchema } from "../validation/loginSchema";

export function useLoginViewModel() {
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            setError("");
            await login(data.username, data.password, data.rememberMe);
            navigate("/");
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        isSubmitting,
        error,
        errors,
    };
}
