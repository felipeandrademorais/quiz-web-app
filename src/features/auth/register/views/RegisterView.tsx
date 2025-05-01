import { Link } from "react-router-dom";
import { TextInput } from "../../../../components/Input";
import { useRegisterViewModel } from "../view-models/useRegisterViewModel";
import { Button } from "@radix-ui/themes";

export default function RegisterView() {
    const { register, handleSubmit, onSubmit, isSubmitting, error, errors } =
        useRegisterViewModel();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
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
                            label="Username"
                            placeholder="Username"
                            autoComplete="username"
                            error={errors.username?.message}
                        />
                        <TextInput
                            name="email"
                            register={register}
                            type="email"
                            label="Email"
                            placeholder="Email address"
                            autoComplete="email"
                            error={errors.email?.message}
                        />
                        <TextInput
                            name="password"
                            register={register}
                            type="password"
                            label="Password"
                            placeholder="Password"
                            error={errors.password?.message}
                        />
                        <TextInput
                            name="confirmPassword"
                            register={register}
                            type="password"
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            error={errors.confirmPassword?.message}
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full"
                        >
                            {isSubmitting
                                ? "Creating account..."
                                : "Create account"}
                        </Button>
                    </div>

                    <div className="text-center">
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Already have an account? Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
