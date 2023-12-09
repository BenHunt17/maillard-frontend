import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateRecipeModalView from "../view/CreateRecipeModalView";
import {
  RecipeCreateInput,
  recipeCreateInputSchema,
} from "../../../data/inputs/recipeCreateInput";
import { useRequest } from "../../../../common/hooks/useRequest";

interface CreateRecipeModalControllerProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function CreateRecipeModelController({
  isOpen,
  setIsOpen,
}: CreateRecipeModalControllerProps) {
  const { callback, loading, error } = useRequest("/recipes", "post", () =>
    setIsOpen(false)
  );

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

  const createRecipe = (formData: RecipeCreateInput) => {
    const data = {
      prepTime: parseTimeString(formData.data.prepTime),
      cookTime: parseTimeString(formData.data.cookTime),
      washingUpTime: parseTimeString(formData.data.washingUpTime),
    };
    if (
      data.cookTime === undefined ||
      data.prepTime === undefined ||
      data.washingUpTime === undefined
    ) {
      return;
    }
    callback({
      body: { ...formData, ingredients: [], instructions: [], data },
    });
  };

  return (
    <CreateRecipeModalView
      isOpen={isOpen}
      handleClose={() => setIsOpen(false)}
      control={control}
      onSubmit={handleSubmit(createRecipe)}
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
