import { useFetch } from "../../common/hooks/useFetch";
import { Maybe } from "../../core/utils/types";
import { IngredientResponse } from "./types/IngredientResponse";

export function useSearchIngredients(
  searchTerm: string,
  offset: number,
  limit: number
) {
  const { data, loading, error } = useFetch<Maybe<IngredientResponse>>(
    "/ingredients/search/",
    "POST",
    {
      body: { searchTerm, offset, limit },
    }
  );

  return { data, loading, error };
}
