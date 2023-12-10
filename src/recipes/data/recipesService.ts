import { useFetch } from "../../common/hooks/useFetch";
import { useRequest } from "../../common/hooks/useRequest";
import { RecipeCreateInput } from "./formInputs/recipeCreateInput";
import { Recipe, RecipeResponse } from "./types/RecipeResponse";
import { AbridgedRecipesResponse } from "./types/abridgedRecipesResponse";

export function useSearchRecipes(
  searchTerm: string,
  offset: number,
  limit: number
) {
  const { data, loading, error } = useFetch<AbridgedRecipesResponse>(
    "/recipes/search/",
    "POST",
    {
      body: { searchTerm, offset, limit },
    }
  );

  return { data, loading, error };
}

export function useGetRecipe(id: string) {
  const { data, loading, error, updateResult } = useFetch<RecipeResponse>(
    `/recipes/${id}`,
    "GET"
  );

  return { data, loading, error, updateResult };
}

export function useCreateRecipe(onComplete: (value: RecipeResponse) => void) {
  const { callback, loading, error } = useRequest<RecipeResponse>(
    `/recipes`,
    "POST",
    onComplete
  );
  const createRecipe = (value: object) =>
    callback({ body: { ...value, ingredients: [], instructions: [] } });

  return { createRecipe, loading, error };
}

export function useUploadRecipeImage(
  id: string,
  onComplete: (result: RecipeResponse) => void
) {
  const { callback, loading, error } = useRequest(
    `/recipes/${id}/addimage`,
    "PATCH",
    onComplete
  );

  const completeCallback = (imageFile: File) => {
    const formData = new FormData();
    formData.append("imageFile", imageFile);

    callback({ formData });
  };

  return { callback: completeCallback, loading, error };
}

export function useRemoveRecipeImage(
  id: string,
  onComplete: (result: RecipeResponse) => void
) {
  const { callback, loading, error } = useRequest(
    `/recipes/${id}/removeimage`,
    "PATCH",
    onComplete
  );

  return { callback, loading, error };
}
