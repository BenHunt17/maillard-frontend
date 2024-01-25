import UpdateIgredientsModalView from "../views/UpdateIgredientsModalView";
import { useFieldArray, useForm } from "react-hook-form";
import {
  IngredientInput,
  ingredientInputSchema,
} from "../../../../data/formInputs/ingredientInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ingredient } from "../../../../data/types/RecipeResponse";
import { useUpdateRecipeIngredients } from "../../../../data/recipesService";

interface UpdateIgredientsModalControllerProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  recipeId: string;
  currentIngredients: Ingredient[];
}

export default function UpdateIgredientsModalController({
  isOpen,
  setIsOpen,
  recipeId,
  currentIngredients,
}: UpdateIgredientsModalControllerProps) {
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

  const { updateRecipeIngredients, loading, error } =
    useUpdateRecipeIngredients((result) => {}, recipeId);

  const handleUpdateRecipeIngredients = (formData: IngredientInput) => {
    updateRecipeIngredients(formData.ingredients);
  };

  const addIngredient = () =>
    append({
      name: "",
      quantity: 0,
      displayLabel: "",
      externalId: "",
    });

  return (
    <UpdateIgredientsModalView
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
