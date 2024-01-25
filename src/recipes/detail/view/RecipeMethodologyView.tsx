import { Box, IconButton, Typography } from "@mui/material";
import { InfoBox } from "../../../common/components/styled/InfoBox";
import { Recipe } from "../../data/types/RecipeResponse";
import { Edit } from "@mui/icons-material";

interface RecipeMethodologyViewProps {
  recipe: Recipe;
  openModal: () => void;
}

export default function RecipeMethodologyView({
  recipe,
  openModal,
}: RecipeMethodologyViewProps) {
  const hasInstructions = recipe.instructions.length > 0;

  return (
    <InfoBox>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">Methodology</Typography>
        <IconButton onClick={openModal}>
          <Edit />
        </IconButton>
      </Box>
      {hasInstructions ? (
        <>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              <Typography variant="body1">{`${ingredient.displayLabel} ${ingredient.name}`}</Typography>
            </li>
          ))}
        </>
      ) : (
        <Box display="flex" justifyContent="center" padding={32}>
          <Typography variant="body2">No Instructions Configured</Typography>
        </Box>
      )}
    </InfoBox>
  );
}
