import { Link } from "react-router-dom";
import { TextInput } from "../../../../components/Input";
import { CheckboxInput } from "../../../../components/Checkbox";
import { useLoginViewModel } from "../view-models/useLoginViewModel";
import { Button } from "@radix-ui/themes";

export default function LoginView() {
    const { register, handleSubmit, onSubmit, isSubmitting, errors } =
        useLoginViewModel();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Acessar sua conta
                    </h2>
                </div>
                <form
                    className="mt-8 space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-4">
                        <TextInput
                            name="username"
                            register={register}
                            type="text"
                            label="Email"
                            placeholder="Email"
                            autoComplete="username"
                            error={errors.username?.message}
                        />
                        <TextInput
                            name="password"
                            register={register}
                            type="password"
                            label="Senha"
                            placeholder="Senha"
                            autoComplete="current-password"
                            error={errors.password?.message}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <CheckboxInput
                            name="rememberMe"
                            label="Lembrar-me"
                            register={register}
                        />

                        <div className="text-sm">
                            <Link
                                to="/forgot-password"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                Esqueceu sua senha?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full"
                        >
                            {isSubmitting ? "Acessando..." : "Acessar"}
                        </Button>
                    </div>

                    <div className="text-center">
                        <Link
                            to="/register"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Não tem uma conta? Cadastre-se
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
