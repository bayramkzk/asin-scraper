import { HTMLInputTypeAttribute, useId } from "react";
import { Controller, FieldValues, Control } from "react-hook-form";
import TextField from "@mui/material/TextField";

interface RhfTextFieldProps {
  control: Control<FieldValues, any>;
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
}

export default function RhfTextField({
  control,
  name,
  label,
  type,
}: RhfTextFieldProps) {
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          value={value}
          onChange={onChange}
          autoFocus
          variant="outlined"
          fullWidth
          id={`${id}-${name}}`}
          name={name}
          label={label}
          type={type}
        />
      )}
    />
  );
}
