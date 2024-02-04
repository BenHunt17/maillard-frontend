import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import ModalTemplate from "../../../common/template/ModalTemplate";
import FormTextField from "../../../common/components/formInputs/FormTextField";
import { RecipeInput } from "../../data/formInputs/recipeInput";
import { UseFormReturn } from "react-hook-form";

interface RecipeDetailsModalViewProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  loading: boolean;
  error: boolean;
  isCreate: boolean;
  formFunctions: UseFormReturn<RecipeInput>;
}

export default function RecipeDetailsModalView({
  isOpen,
  onClose,
  onSubmit,
  loading,
  error,
  isCreate,
  formFunctions,
}: RecipeDetailsModalViewProps) {
  const theme = useTheme();

  const title = isCreate ? "Create Recipe" : "Update Recipe";
  const networkErrorMessage = isCreate
    ? "There was an issue creating your recipe"
    : "There was an issue updating your recipe";

  const { isValid, isDirty } = formFunctions.formState;
  const canSubmit = isValid && isDirty;

  return (
    <ModalTemplate isOpen={isOpen} onClose={onClose} title={title}>
      <FormTextField
        control={formFunctions.control}
        name="name"
        label="Recipe name"
        required
      />
      <FormTextField
        control={formFunctions.control}
        name="description"
        label="Description"
      />
      <Grid container spacing={16}>
        <Grid item xs={6}>
          <FormTextField
            control={formFunctions.control}
            name="data.prepTime"
            label="Prep time"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            control={formFunctions.control}
            name="data.cookTime"
            label="Cooking time"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            control={formFunctions.control}
            name="data.washingUpTime"
            label="Washing up time"
            required
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={loading || canSubmit}
        >
          Submit
        </Button>
      </Box>
      {error && (
        <Typography variant="body1" color={theme.palette.error.main}>
          {networkErrorMessage}
        </Typography>
      )}
    </ModalTemplate>
  );
}
