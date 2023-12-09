import { Box, Grid } from "@mui/material";
import { Recipe } from "../../data/types/RecipeResponse";
import RecipeOverview from "./RecipeOverview";

interface RecipeDetailViewProps {
  recipe: Recipe;
}

export default function RecipeDetailView({ recipe }: RecipeDetailViewProps) {
  return (
    <Box padding="28px 0">
      <Grid container>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <RecipeOverview recipe={recipe} />
        </Grid>
      </Grid>
    </Box>
  );
}
