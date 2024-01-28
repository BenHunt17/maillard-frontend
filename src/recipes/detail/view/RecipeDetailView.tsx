import { Box, Grid } from "@mui/material";
import { Children } from "react";

interface RecipeDetailViewProps {
  children: React.ReactNode;
}

export default function RecipeDetailView({ children }: RecipeDetailViewProps) {
  const views = Children.map(children, (child) => child);
  if (views?.length !== 3) {
    throw Error("RecipeDetailView must have 2 children passed");
  }

  return (
    <Box padding="28px 0">
      <Grid container spacing={8}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          {views[0]}
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          {views[1]}
          {views[2]}
        </Grid>
      </Grid>
    </Box>
  );
}
