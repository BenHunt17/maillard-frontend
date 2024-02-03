import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateRecipeDetails } from "../../../../data/recipesService";
import { ModalStateProps } from "../../../../../common/data/modalState";
import { useRecipe } from "../../../../common/RecipeProvider";
import {
  RecipeInput,
  recipeInputSchema,
} from "../../../../data/formInputs/recipeInput";
import RecipeDetailsModalView from "../../../common/RecipeDetailsModalView";
import { parseTimeString } from "../../../common/parseTimeString";

export default function UpdateRecipeDetailsModelController({
  isOpen,
  setIsOpen,
}: ModalStateProps) {
  const { recipe, setRecipe } = useRecipe();

  const { updateRecipeDetails, loading, error } = useUpdateRecipeDetails(
    (result) => {
      setRecipe(result.recipe);
      setIsOpen(false);
    },
    recipe.id
  );

  const { control, handleSubmit } = useForm<RecipeInput>({
    defaultValues: {
      name: "",
      description: "",
      data: {
        prepTime: "",
        cookTime: "",
        washingUpTime: "",
      },
    },
    resolver: zodResolver(recipeInputSchema),
  });

  const handleUpdateRecipeDetails = (formData: RecipeInput) => {
    const data = {
      prepTime: parseTimeString(formData.data.prepTime),
      cookTime: parseTimeString(formData.data.cookTime),
      washingUpTime: parseTimeString(formData.data.washingUpTime),
    };
    if (
      data.cookTime === undefined &&
      data.prepTime === undefined &&
      data.washingUpTime === undefined
    ) {
      return;
    }
    updateRecipeDetails({
      ...formData,
      data,
    });
  };

  return (
    <RecipeDetailsModalView
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      control={control}
      onSubmit={handleSubmit(handleUpdateRecipeDetails)}
      loading={loading}
      error={error !== undefined}
      isCreate={false}
    />
  );
}
