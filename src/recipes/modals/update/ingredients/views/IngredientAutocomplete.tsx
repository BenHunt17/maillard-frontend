import { UseFormReturn } from "react-hook-form";
import FormAutocomplete from "../../../../../common/components/formInputs/FormAutocomplete";
import { IngredientInput } from "../../../../data/formInputs/ingredientInput";
import { useSearchIngredients } from "../../../../data/ingredientsService";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";
import { SEARCH_DEBOUNCE_DELAY } from "../../../../../common/utils/constants";
import { IngredientResponse } from "../../../../data/types/IngredientResponse";

interface IngredientAutocompleteProps {
  formFunctions: UseFormReturn<IngredientInput>;
  fieldIndex: number;
}

export default function IngredientAutocomplete({
  formFunctions,
  fieldIndex,
}: IngredientAutocompleteProps) {
  const ingredientName = formFunctions.watch(`ingredients.${fieldIndex}.name`);

  const [searchTerm] = useDebounce(ingredientName, SEARCH_DEBOUNCE_DELAY);

  const { data, loading } = useSearchIngredients(searchTerm, 0, 50);

  useListenAndSetIngredientId(data, formFunctions, fieldIndex);

  return (
    <FormAutocomplete
      control={formFunctions.control}
      name={`ingredients.${fieldIndex}.name`}
      label="Ingredient"
      options={data?.ingredients.map((ingredient) => ingredient.name) ?? []}
      noOptionsText={
        loading ? "Loading" : "Begin typing to search for ingredient"
      }
    />
  );
}

function useListenAndSetIngredientId(
  ingredientsData: IngredientResponse | undefined,
  formFunctions: UseFormReturn<IngredientInput>,
  fieldIndex: number
) {
  useEffect(() => {
    const subscription = formFunctions.watch((value, { name }) => {
      if (name === `ingredients.${fieldIndex}.name`) {
        const foundIngredientId = ingredientsData?.ingredients.find(
          (ingredient) =>
            value.ingredients?.[fieldIndex]?.name === ingredient.name
        )?.externalId;

        if (foundIngredientId) {
          formFunctions.setValue(
            `ingredients.${fieldIndex}.externalId`,
            foundIngredientId
          );
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [ingredientsData?.ingredients, fieldIndex, formFunctions]);
}
