import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateRecipeModalView from "../view/CreateRecipeModalView";
import {
  RecipeCreateInput,
  recipeCreateInputSchema,
} from "../../../data/formInputs/recipeCreateInput";
import { useNavigate } from "react-router-dom";
import { useCreateRecipe } from "../../../data/recipesService";

interface CreateRecipeModalControllerProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function CreateRecipeModelController({
  isOpen,
  setIsOpen,
}: CreateRecipeModalControllerProps) {
  const navigate = useNavigate();

  const { createRecipe, loading, error } = useCreateRecipe((result) => {
    setIsOpen(false);
    navigate(`/recipes/${result.recipe.id}`);
  });

  const { control, handleSubmit } = useForm<RecipeCreateInput>({
    defaultValues: {
      name: "",
      description: "",
      data: {
        prepTime: "",
        cookTime: "",
        washingUpTime: "",
      },
    },
    resolver: zodResolver(recipeCreateInputSchema),
  });

  const handleCreateRecipe = (formData: RecipeCreateInput) => {
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
    createRecipe({
      ...formData,
      data,
    });
  };

  return (
    <CreateRecipeModalView
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      control={control}
      onSubmit={handleSubmit(handleCreateRecipe)}
      loading={loading}
      error={error !== undefined}
    />
  );
}

function parseTimeString(value: string) {
  if (value.length !== 5) {
    return undefined;
  }

  const hours = parseInt(value.substring(0, 2));
  const minutes = parseInt(value.substring(3, 5));
  if (isNaN(hours) || isNaN(minutes)) {
    return undefined;
  }

  return hours * 60 + minutes;
}
