import { PaginatedResponse } from "../../common/data/paginatedResponse";
import { useFetch } from "../../common/hooks/useFetch";
import { AbridgedRecipe } from "./abridgedRecipe";

export function useSearchRecipes(
  searchTerm: string,
  offset: number,
  limit: number
) {
  const { data, loading } = useFetch<Response>("/recipes/search/", "post", {
    body: { searchTerm, offset, limit },
  });

  return { data, loading };
}

interface Response {
  paginatedRecipes: PaginatedResponse<AbridgedRecipe>;
}
