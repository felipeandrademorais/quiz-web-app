import { Link } from "react-router-dom";
import { TextInput } from "../../../../components/Input";
import { useForgotPasswordViewModel } from "../view-models/useForgotPasswordViewModel";
import { Button } from "@radix-ui/themes";

export default function ForgotPasswordView() {
    const {
        register,
        handleSubmit,
        onSubmit,
        isSubmitting,
        error,
        success,
        errors,
    } = useForgotPasswordViewModel();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Reset your password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your email address and we'll send you instructions
                        to reset your password.
                    </p>
                </div>
                <form
                    className="mt-8 space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <TextInput
                            name="email"
                            register={register}
                            type="email"
                            label="Email"
                            placeholder="Email address"
                            autoComplete="email"
                            error={errors.email?.message}
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="text-green-600 text-sm text-center">
                            {success}
                        </div>
                    )}

                    <div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full"
                        >
                            {isSubmitting ? "Sending..." : "Reset Password"}
                        </Button>
                    </div>

                    <div className="text-center">
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Back to Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
