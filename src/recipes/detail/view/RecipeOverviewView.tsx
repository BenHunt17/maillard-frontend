import { Box, Typography } from "@mui/material";
import { Nutrient, RecipeResponse } from "../../common/types/RecipeResponse";
import ZebraView from "../../../common/components/ZebraView";
import { InfoBox } from "../../../common/components/styled/InfoBox";
import Img from "../../../common/components/img/Img";
import {
  useRemoveRecipeImage,
  useUploadRecipeImage,
} from "../../data/recipesService";
import { useRecipe } from "../../common/RecipeProvider";

export default function RecipeOverviewView() {
  const { recipe, setRecipe } = useRecipe();

  const updateRecipe = (response: RecipeResponse) => setRecipe(response.recipe);

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
    if (curr.name === "Energy" && curr.unitName === "kJ") {
      return acc;
    }

    return [
      ...acc,
      {
        name: curr.name,
        value: `${Math.round(curr.value * 1000) / 1000} ${curr.unitName}`,
      },
    ];
  }, []);
}
