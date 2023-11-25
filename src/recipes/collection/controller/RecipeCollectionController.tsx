import { useState } from "react";
import { useSearchRecipes } from "../../data/recipesService";
import RecipeCollectionView from "../view/RecipeCollectionView";
import { useDebounce } from "use-debounce";
import {
  PAGINATION_LIMIT,
  SEARCH_DEBOUNCE_DELAY,
} from "../../../common/utils/constants";

export default function RecipeCollectionController() {
  const [searchText, setSearchText] = useState("");
  const [searchTerm] = useDebounce(searchText, SEARCH_DEBOUNCE_DELAY);

  const { data, loading } = useSearchRecipes(searchTerm, 0, PAGINATION_LIMIT);

  return (
    <RecipeCollectionView
      recipes={data?.paginatedRecipes.items ?? []}
      searchText={searchText}
      setSearchText={setSearchText}
      loading={loading}
    />
  );
}
