import {
  Autocomplete,
  Box,
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
  options: string[];
  required?: boolean;
  noOptionsText?: string;
}

export default function FormAutocomplete<T extends FieldValues>({
  control,
  name,
  label,
  options,
  required,
  noOptionsText,
}: FormTextFieldProps<T>) {
  const theme = useTheme();
  const { field, fieldState } = useController<T>({ control, name });

  return (
    <Box width="100%">
      <Autocomplete
        value={field.value}
        onChange={(_, data) => field.onChange(data)}
        renderInput={(params) => (
          <TextField
            {...params}
            {...field}
            label={label}
            required={required}
            error={Boolean(fieldState.error)}
            fullWidth
          />
        )}
        options={options}
        noOptionsText={noOptionsText}
        filterOptions={(opt) => opt}
      />
      <Typography variant="body1" color={theme.palette.error.main}>
        {fieldState.error?.message}
      </Typography>
    </Box>
  );
}
