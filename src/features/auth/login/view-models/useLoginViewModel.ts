import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useAuth } from "../../../../contexts/AuthContext";
import { LoginFormData, loginSchema } from "../validation/loginSchema";

export function useLoginViewModel() {
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
            console.log("onSubmit", data);
            await login(data.username, data.password, data.rememberMe);
            navigate("/");
        } catch (err) {
            console.log(err);
            toast.error("Email ou senha inválidos");
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
