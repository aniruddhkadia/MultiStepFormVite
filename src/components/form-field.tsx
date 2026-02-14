import { cn } from "@/lib/utils";
import type { AllFormFields } from "@/types";
import type { useForm } from "react-hook-form";

interface FormFieldProps {
  id: keyof AllFormFields;
  label: string;
  register: ReturnType<typeof useForm<AllFormFields>>["register"];
  errors: Record<string, { message?: string }>;
  type?: string;
  maxLength?: number;
  trigger: ReturnType<typeof useForm<AllFormFields>>["trigger"];
  setValue: ReturnType<typeof useForm<AllFormFields>>["setValue"];
  className?: string;
}

const FormField = ({
  id,
  label,
  register,
  errors,
  type,
  maxLength,
  trigger,
  setValue,
  className,
}: FormFieldProps) => {
  return (
    <div className={cn("mb-4", className)}>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        maxLength={maxLength}
        {...register?.(id)}
        className="border border-gray-300 rounded-md px-3 py-2"
        onBlur={() => trigger(id)}
        onChange={(e) => setValue(id, e.target.value)}
      />
      {errors[id] && (
        <p className="text-red-500 text-sm">{errors[id]?.message}</p>
      )}
    </div>
  );
};

export default FormField;
