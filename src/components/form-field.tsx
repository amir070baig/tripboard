import type { InputHTMLAttributes } from "react";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  leadingMark?: string;
};

export function FormField({ label, leadingMark, className = "", id, ...props }: FormFieldProps) {
  const inputId = id ?? props.name;

  return (
    <div className={`form-field ${className}`.trim()}>
      <label className="visually-hidden" htmlFor={inputId}>{label}</label>
      {leadingMark && <span className="form-field__mark" aria-hidden="true">{leadingMark}</span>}
      <input id={inputId} {...props} />
    </div>
  );
}
