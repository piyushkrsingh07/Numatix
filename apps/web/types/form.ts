import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  disabled?: boolean;
};