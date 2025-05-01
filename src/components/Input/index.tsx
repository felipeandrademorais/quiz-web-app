import { InputHTMLAttributes } from "react";
import { UseFormRegister, Path } from "react-hook-form";
import * as Label from "@radix-ui/react-label";
import { Text } from "@radix-ui/themes";

export interface TextInputProps<TFormValues extends { [key: string]: unknown }>
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
    name: Path<TFormValues>;
    label?: string;
    register: UseFormRegister<TFormValues>;
    placeholder?: string;
    error?: string;
}

export function TextInput<TFormValues extends { [key: string]: unknown }>({
    name,
    label,
    register,
    placeholder,
    error,
    className = "",
    ...rest
}: TextInputProps<TFormValues>) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <Label.Root
                    className="text-sm font-medium text-gray-700"
                    htmlFor={name}
                >
                    {label}
                </Label.Root>
            )}
            <input
                type="text"
                {...register(name)}
                placeholder={placeholder}
                className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    error ? "border-red-500" : ""
                } ${className}`}
                {...rest}
            />
            {error && (
                <Text color="red" size="1">
                    {error}
                </Text>
            )}
        </div>
    );
}
