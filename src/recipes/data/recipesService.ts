import { useFetch } from "../../common/hooks/useFetch";
import { RecipeResponse } from "./types/RecipeResponse";
import { AbridgedRecipesResponse } from "./types/abridgedRecipesResponse";

export function useSearchRecipes(
  searchTerm: string,
  offset: number,
  limit: number
) {
  const { data, loading, error } = useFetch<AbridgedRecipesResponse>(
    "/recipes/search/",
    "post",
    {
      body: { searchTerm, offset, limit },
    }
  );

  return { data, loading, error };
}

export function useGetRecipe(id: string) {
  const { data, loading, error } = useFetch<RecipeResponse>(
    `/recipes/${id}`,
    "get"
  );

  return { data, loading, error };
}
