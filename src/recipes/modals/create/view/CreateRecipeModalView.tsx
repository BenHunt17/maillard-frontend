import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import ModalTemplate from "../../../../common/template/ModalTemplate";
import FormTextField from "../../../../common/components/formInputs/FormTextField";
import { Control } from "react-hook-form";
import { RecipeCreateInput } from "../../../data/formInputs/recipeCreateInput";

interface CreateRecipeModalViewProps {
  isOpen: boolean;
  onClose: () => void;
  control: Control<RecipeCreateInput>;
  onSubmit: () => void;
  loading: boolean;
  error: boolean;
}

export default function CreateRecipeModalView({
  isOpen,
  onClose,
  control,
  onSubmit,
  loading,
  error,
}: CreateRecipeModalViewProps) {
  const theme = useTheme();

  return (
    <ModalTemplate isOpen={isOpen} onClose={onClose} title="Create Recipe">
      <FormTextField
        control={control}
        name="name"
        label="Recipe name"
        required
      />
      <FormTextField control={control} name="description" label="Description" />
      <Grid container spacing={16}>
        <Grid item xs={6}>
          <FormTextField
            control={control}
            name="data.prepTime"
            label="Prep time"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            control={control}
            name="data.cookTime"
            label="Cooking time"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            control={control}
            name="data.washingUpTime"
            label="Washing up time"
            required
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={onSubmit} disabled={loading}>
          Submit
        </Button>
      </Box>
      {error && (
        <Typography variant="body1" color={theme.palette.error.main}>
          There was an issue creating your recipe
        </Typography>
      )}
    </ModalTemplate>
  );
}
