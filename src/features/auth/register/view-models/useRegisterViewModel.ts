import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../../contexts/AuthContext";
import { RegisterFormData, registerSchema } from "../validation/registerSchema";

export function useRegisterViewModel() {
    const [error, setError] = useState("");
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            setError("");
            await registerUser(data.username, data.email, data.password);
            navigate("/login");
        } catch {
            setError("Registration failed. Please try again.");
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
