import { Box, IconButton, Typography, styled } from "@mui/material";
import { InfoBox } from "../../../common/components/styled/InfoBox";
import { Edit } from "@mui/icons-material";
import { useRecipe } from "../../common/RecipeProvider";
import { useAuth } from "../../../core/auth/AuthProvider";

interface RecipeIngredientsViewProps {
  openModal: () => void;
}

export default function RecipeIngredientsView({
  openModal,
}: RecipeIngredientsViewProps) {
  const { recipe } = useRecipe();
  const { bearerToken } = useAuth();

  const hasIngredients = (recipe?.ingredients?.length ?? 0) > 0;

  return (
    <InfoBox>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">Ingredients</Typography>
        {bearerToken !== undefined && (
          <IconButton onClick={openModal}>
            <Edit />
          </IconButton>
        )}
      </Box>
      {hasIngredients ? (
        <Layout>
          {recipe?.ingredients?.map((ingredient) => (
            <li key={ingredient.id}>
              <Typography variant="body1">
                {ingredient.displayLabel ??
                  (ingredient.quantity && ingredient.name
                    ? `${ingredient.quantity}g ${ingredient.name}`
                    : "Unknown")}
              </Typography>
            </li>
          ))}
        </Layout>
      ) : (
        <Box display="flex" justifyContent="center" padding={32}>
          <Typography variant="body2">No Ingredients Configured</Typography>
        </Box>
      )}
    </InfoBox>
  );
}

const Layout = styled("ul")({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 200px)",
  alignItems: "center",
  gap: 32,
});
