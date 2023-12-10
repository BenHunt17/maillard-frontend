import { Box, Grid } from "@mui/material";
import { Recipe, RecipeResponse } from "../../data/types/RecipeResponse";
import RecipeOverview from "./RecipeOverview";

interface RecipeDetailViewProps {
  recipe: Recipe;
  updateRecipe: (value: RecipeResponse) => void;
}

export default function RecipeDetailView({
  recipe,
  updateRecipe,
}: RecipeDetailViewProps) {
  return (
    <Box padding="28px 0">
      <Grid container>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <RecipeOverview recipe={recipe} updateRecipe={updateRecipe} />
        </Grid>
      </Grid>
    </Box>
  );
}
