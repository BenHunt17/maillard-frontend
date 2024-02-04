import { Box, IconButton, Typography } from "@mui/material";
import { InfoBox } from "../../../common/components/styled/InfoBox";
import { Edit } from "@mui/icons-material";
import { useRecipe } from "../../common/RecipeProvider";

interface RecipeMethodologyViewProps {
  openModal: () => void;
}

export default function RecipeMethodologyView({
  openModal,
}: RecipeMethodologyViewProps) {
  const { orderedInstructions } = useRecipe();

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
              {instruction.priorityNumber && instruction.step ? (
                <>
                  <b>{instruction.priorityNumber}</b>
                  &nbsp; &nbsp;
                  {instruction.step}
                </>
              ) : (
                "Unknown"
              )}
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
