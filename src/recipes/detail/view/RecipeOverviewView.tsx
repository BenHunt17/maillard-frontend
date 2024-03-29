import { Box, IconButton, Typography } from "@mui/material";
import ZebraView from "../../../common/components/ZebraView";
import { InfoBox } from "../../../common/components/styled/InfoBox";
import { useRecipe } from "../../common/RecipeProvider";
import { Nutrient } from "../../data/types/RecipeResponse";
import { Edit } from "@mui/icons-material";
import { minutesToTimeString } from "../../modals/common/minutesToTimeString";
import { useAuth } from "../../../core/auth/AuthProvider";

interface RecipeOverviewViewProps {
  recipeImage: React.ReactNode;
  openModal: () => void;
}

export default function RecipeOverviewView({
  recipeImage,
  openModal,
}: RecipeOverviewViewProps) {
  const { recipe } = useRecipe();
  const { bearerToken } = useAuth();

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h3">{recipe?.name ?? "Unknown"}</Typography>
        {bearerToken !== undefined && (
          <IconButton onClick={openModal}>
            <Edit />
          </IconButton>
        )}
      </Box>
      {recipe.description && (
        <InfoBox>
          <Typography variant="body1">{recipe.description}</Typography>
        </InfoBox>
      )}
      {recipeImage}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body1">
          Prep time: <b>{minutesToTimeString(recipe?.data?.prepTime)}</b>
        </Typography>
        <Typography variant="body1">
          Cooking time: <b>{minutesToTimeString(recipe?.data?.cookTime)}</b>
        </Typography>
        <Typography variant="body1">
          Washing up time:
          <b> {minutesToTimeString(recipe?.data?.washingUpTime)}</b>
        </Typography>
      </Box>
      {(recipe?.nutrients?.length ?? 0) > 0 && (
        <ZebraView content={cleanNutrientsData(recipe?.nutrients ?? [])} />
      )}
    </>
  );
}

function cleanNutrientsData(nutrients: Nutrient[]) {
  //Converts energy in joules to kcal and picks relevant nutrients
  const relevantNutrients = [
    "Energy",
    "Protein",
    "Carbohydrate, by difference",
    "Total lipid (fat)",
    "Sodium, Na",
    "Cholesterol",
    "Fiber, total dietary",
  ];

  return nutrients.reduce<{ name: string; value: string }[]>((acc, curr) => {
    if (!relevantNutrients.includes(curr?.name ?? "")) {
      return acc;
    }
    if (curr.name === "Energy" && curr.unitName === "kJ") {
      return acc;
    }

    return [
      ...acc,
      {
        name: curr?.name ?? "",
        value: curr?.value
          ? `${Math.round(curr.value * 1000) / 1000} ${curr.unitName}`
          : "0",
      },
    ];
  }, []);
}
