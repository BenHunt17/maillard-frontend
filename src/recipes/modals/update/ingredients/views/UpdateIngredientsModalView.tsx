import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import ModalTemplate from "../../../../../common/template/ModalTemplate";
import { FieldArrayWithId, UseFormReturn } from "react-hook-form";
import { IngredientInput } from "../../../../data/formInputs/ingredientInput";
import IngredientAutocomplete from "./IngredientAutocomplete";
import FormTextField from "../../../../../common/components/formInputs/FormTextField";
import { Delete } from "@mui/icons-material";

interface UpdateIngredientsModalViewProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  loading: boolean;
  formFunctions: UseFormReturn<IngredientInput>;
  fields: FieldArrayWithId<IngredientInput, "ingredients", "id">[];
  addIngredient: () => void;
  removeIngredient: (index: number) => void;
}

export default function UpdateIngredientsModalView({
  isOpen,
  onClose,
  onSubmit,
  loading,
  formFunctions,
  fields,
  addIngredient,
  removeIngredient,
}: UpdateIngredientsModalViewProps) {
  const theme = useTheme();

  const { isValid, isDirty } = formFunctions.formState;
  const canSubmit = isValid && isDirty;

  return (
    <ModalTemplate title="Update Ingredients" isOpen={isOpen} onClose={onClose}>
      <div
        style={{
          overflow: "auto",
        }}
      >
        {fields.map((field, index) => (
          <Box
            key={field.id}
            padding={16}
            sx={{
              display: "flex",
              backgroundColor:
                index % 2 === 0
                  ? theme.palette.grey[200]
                  : theme.palette.grey[50],
              borderRadius: 4,
              flexDirection: "column",
              gap: 8,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">{`Ingredient ${index + 1}`}</Typography>
              {index > 0 && (
                <IconButton onClick={() => removeIngredient(index)}>
                  <Delete />
                </IconButton>
              )}
            </Box>
            <Box display="flex" gap={8}>
              <IngredientAutocomplete
                formFunctions={formFunctions}
                fieldIndex={index}
              />
              <FormTextField
                control={formFunctions.control}
                name={`ingredients.${index}.displayLabel`}
                label="Display Label"
              />
              <FormTextField
                control={formFunctions.control}
                name={`ingredients.${index}.quantity`}
                label="Quantity"
                unit="g"
              />
            </Box>
          </Box>
        ))}
      </div>
      <div>
        <Button variant="outlined" onClick={addIngredient}>
          Add Ingredient
        </Button>
      </div>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={loading || !canSubmit}
        >
          Submit
        </Button>
      </Box>
    </ModalTemplate>
  );
}
