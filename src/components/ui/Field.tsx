import type { ReactNode, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const controlClassName =
  "h-11 w-full min-h-11 border border-brand-border bg-white px-3 text-base text-brand-black outline-none transition-colors focus:border-brand-gold focus:ring-1 focus:ring-brand-gold disabled:bg-brand-surface aria-invalid:border-red-700";

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
};

export function Field({ id, label, required, error, children }: FieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-brand-black">
        {label}
        {required ? <span className="text-red-700"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type TextInputProps = {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: "text" | "tel" | "email" | "password" | "date";
  autoComplete?: string;
  inputMode?: "text" | "tel" | "numeric" | "decimal";
  onBlur?: () => void;
  autoFocus?: boolean;
};

export function TextInput({
  id,
  name,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  inputMode,
  onBlur,
  autoFocus,
}: TextInputProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      autoComplete={autoComplete}
      inputMode={inputMode}
      autoFocus={autoFocus}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      className={controlClassName}
    />
  );
}

type TextAreaProps = {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  rows?: number;
};

export function TextArea({
  id,
  name,
  value,
  onChange,
  error,
  rows = 4,
}: TextAreaProps) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      rows={rows}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
      onChange={(event) => onChange(event.target.value)}
      className={`${controlClassName} h-auto min-h-28 py-2`}
    />
  );
}

type SelectInputProps = {
  id: string;
  name: string;
  value: string;
  error?: string;
  placeholder: string;
  options: readonly string[];
  onChange: (value: string) => void;
} & Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "id" | "name" | "value" | "onChange"
>;

export function SelectInput({
  id,
  name,
  value,
  error,
  placeholder,
  options,
  onChange,
  ...props
}: SelectInputProps) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
      onChange={(event) => onChange(event.target.value)}
      className={cn(controlClassName, "bg-white")}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
