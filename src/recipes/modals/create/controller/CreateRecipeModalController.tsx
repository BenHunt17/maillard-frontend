import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RecipeInput,
  recipeInputSchema,
} from "../../../data/formInputs/recipeInput";
import { useNavigate } from "react-router-dom";
import { useCreateRecipe } from "../../../data/recipesService";
import { ModalStateProps } from "../../../../common/data/modalState";
import RecipeDetailsModalView from "../../common/RecipeDetailsModalView";
import { parseTimeString } from "../../common/parseTimeString";

export default function CreateRecipeModelController({
  isOpen,
  setIsOpen,
}: ModalStateProps) {
  const navigate = useNavigate();

  const { createRecipe, loading, error } = useCreateRecipe((response) => {
    setIsOpen(false);
    formFunctions.reset();
    if (response?.recipe?.id) {
      navigate(`/recipes/${response.recipe.id}`);
    }
  });

  const formFunctions = useForm<RecipeInput>({
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

  const handleCreateRecipe = (formData: RecipeInput) => {
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
    <RecipeDetailsModalView
      isOpen={isOpen}
      onClose={() => {
        formFunctions.reset();
        setIsOpen(false);
      }}
      onSubmit={formFunctions.handleSubmit(handleCreateRecipe)}
      loading={loading}
      error={error !== undefined}
      isCreate
      formFunctions={formFunctions}
    />
  );
}
