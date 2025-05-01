import * as Checkbox from "@radix-ui/react-checkbox";
import * as Label from "@radix-ui/react-label";
import { UseFormRegister } from "react-hook-form";
import { CheckIcon } from "@radix-ui/react-icons";

interface CheckboxProps {
    name: string;
    label: string;
    register: UseFormRegister<any>;
}

export function CheckboxInput({ name, label, register }: CheckboxProps) {
    return (
        <div className="flex items-center gap-2">
            <Checkbox.Root
                className="h-4 w-4 rounded border border-gray-300 bg-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                id={name}
                {...register(name)}
            >
                <Checkbox.Indicator className="flex items-center justify-center text-white">
                    <CheckIcon />
                </Checkbox.Indicator>
            </Checkbox.Root>
            <Label.Root className="text-sm text-gray-700" htmlFor={name}>
                {label}
            </Label.Root>
        </div>
    );
}
