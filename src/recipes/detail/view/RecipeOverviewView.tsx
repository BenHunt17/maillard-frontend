import { Box, Typography } from "@mui/material";
import {
  Nutrient,
  Recipe,
  RecipeResponse,
} from "../../data/types/RecipeResponse";
import ZebraView from "../../../common/components/ZebraView";
import { InfoBox } from "../../../common/components/styled/InfoBox";
import Img from "../../../common/components/img/Img";
import {
  useRemoveRecipeImage,
  useUploadRecipeImage,
} from "../../data/recipesService";

interface RecipeOverviewProps {
  recipe: Recipe;
  updateRecipe: (value: RecipeResponse) => void;
}

export default function RecipeOverviewView({
  recipe,
  updateRecipe,
}: RecipeOverviewProps) {
  const {
    callback: removeRecipeImage,
    loading: removeRecipeImageLoading, //TODO - abstract modal out of view and component
    //TODO - look into toasts
  } = useRemoveRecipeImage(recipe.id, updateRecipe);
  const { callback: uploadRecipeImage, loading: uploadRecipeImageLoading } =
    useUploadRecipeImage(recipe.id, updateRecipe);

  return (
    <>
      <Typography variant="h3">{recipe.name}</Typography>
      {recipe.description && (
        <InfoBox>
          <Typography variant="body1">{recipe.description}</Typography>
        </InfoBox>
      )}
      <Img
        src={recipe.imageUrl}
        alt={recipe.name}
        onUpload={uploadRecipeImage}
        onRemove={removeRecipeImage}
        isLoading={removeRecipeImageLoading || uploadRecipeImageLoading}
      />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body1">
          Prep time: <b>{minutesToTimeString(recipe.data.prepTime)}</b>
        </Typography>
        <Typography variant="body1">
          Cooking time: <b>{minutesToTimeString(recipe.data.cookTime)}</b>
        </Typography>
        <Typography variant="body1">
          Washing up time:
          <b> {minutesToTimeString(recipe.data.washingUpTime)}</b>
        </Typography>
      </Box>
      {recipe.nutrients.length > 0 && (
        <ZebraView content={cleanNutrientsData(recipe.nutrients)} />
      )}
    </>
  );
}

const KCAL_CONVERSION_CONSTANT = 4.184;

function minutesToTimeString(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
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
    if (!relevantNutrients.includes(curr.name)) {
      return acc;
    }

    if (curr.name === "Energy") {
      return [
        ...acc,
        {
          name: "Energy",
          value: `${
            Math.round((curr.value / KCAL_CONVERSION_CONSTANT) * 100) / 100
          } Kcal`,
        },
      ];
    }
    return [
      ...acc,
      {
        name: curr.name,
        value: `${Math.round(curr.value * 100) / 100} ${curr.unitName}`,
      },
    ];
  }, []);
}
