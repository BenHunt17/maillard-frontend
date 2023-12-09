import { Box, Typography } from "@mui/material";
import { Nutrient, Recipe } from "../../data/types/RecipeResponse";
import ZebraView from "../../../common/components/ZebraView";
import { InfoBox } from "../../../common/components/styled/InfoBox";
import Img from "../../../common/components/Img";

interface RecipeOverviewProps {
  recipe: Recipe;
}

export default function RecipeOverview({ recipe }: RecipeOverviewProps) {
  return (
    <>
      <Typography variant="h3">{recipe.name}</Typography>
      <InfoBox>
        <Typography variant="body1">{recipe.description}</Typography>
      </InfoBox>
      <Img src={recipe.imageUrl} alt={recipe.name} />
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
      <ZebraView content={cleanNutrientsData(recipe.nutrients)} />
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
