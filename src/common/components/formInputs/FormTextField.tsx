import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";

interface FormTextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  required?: boolean;
  unit?: string;
}

export default function FormTextField<T extends FieldValues>({
  control,
  name,
  label,
  required,
  unit,
}: FormTextFieldProps<T>) {
  const theme = useTheme();
  const { field, fieldState } = useController<T>({ control, name });

  return (
    <Box width="100%">
      <TextField
        {...field}
        label={label}
        required={required}
        error={Boolean(fieldState.error)}
        fullWidth
        InputProps={
          unit
            ? {
                endAdornment: (
                  <InputAdornment position="end">{unit}</InputAdornment>
                ),
              }
            : undefined
        }
      />
      <Typography variant="body1" color={theme.palette.error.main}>
        {fieldState.error?.message}
      </Typography>
    </Box>
  );
}
