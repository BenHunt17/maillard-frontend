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
  const orderedInstructions = recipe.instructions.sort(
    (a, b) => a.priorityNumber - b.priorityNumber
  );
  const hasInstructions = orderedInstructions.length > 0;

  return (
    <InfoBox>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">Methodology</Typography>
        <IconButton onClick={openModal}>
          <Edit />
        </IconButton>
      </Box>
      {hasInstructions ? (
        <div>
          {orderedInstructions.map((instruction) => (
            <Typography key={instruction.id} variant="body1">
              <b>{instruction.priorityNumber}</b>
              &nbsp; &nbsp;
              {instruction.step}
            </Typography>
          ))}
        </div>
      ) : (
        <Box display="flex" justifyContent="center" padding={32}>
          <Typography variant="body2">No Instructions Configured</Typography>
        </Box>
      )}
    </InfoBox>
  );
}
