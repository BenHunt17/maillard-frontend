import { useFieldArray, useForm } from "react-hook-form";
import {
  IngredientInput,
  ingredientInputSchema,
} from "../../../../data/formInputs/ingredientInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateRecipeIngredients } from "../../../../data/recipesService";
import UpdateIngredientsModalView from "../views/UpdateIngredientsModalView";
import { useRecipe } from "../../../../common/RecipeProvider";

interface UpdateIngredientsModalControllerProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function UpdateIngredientsModalController({
  isOpen,
  setIsOpen,
}: UpdateIngredientsModalControllerProps) {
  const { recipe, setRecipe } = useRecipe();

  const currentIngredients = recipe.ingredients;

  const defaultValues = {
    ingredients:
      currentIngredients.length > 0
        ? currentIngredients
        : [
            {
              name: undefined,
              quantity: undefined,
              displayLabel: undefined,
              externalId: undefined,
            },
          ],
  };

  const formFunctions = useForm<IngredientInput>({
    defaultValues,
    resolver: zodResolver(ingredientInputSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: formFunctions.control,
    name: "ingredients",
  });

  const { updateRecipeIngredients, loading } = useUpdateRecipeIngredients(
    (response) => {
      setRecipe(response.recipe);
      setIsOpen(false);
    },
    recipe.id
  );

  const handleUpdateRecipeIngredients = (formData: IngredientInput) =>
    updateRecipeIngredients(formData.ingredients);

  const addIngredient = () =>
    append({
      name: "",
      quantity: 0,
      displayLabel: "",
      externalId: "",
    });

  return (
    <UpdateIngredientsModalView
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={formFunctions.handleSubmit(handleUpdateRecipeIngredients)}
      loading={loading}
      formFunctions={formFunctions}
      fields={fields}
      addIngredient={addIngredient}
      removeIngredient={remove}
    />
  );
}
