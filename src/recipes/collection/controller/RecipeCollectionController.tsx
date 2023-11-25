import { useState } from "react";
import { useSearchRecipes } from "../../data/recipesService";
import RecipeCollectionView from "../view/RecipeCollectionView";
import { useDebounce } from "use-debounce";
import {
  PAGINATION_LIMIT,
  SEARCH_DEBOUNCE_DELAY,
} from "../../../common/utils/constants";
import Error from "../../../common/components/Error";

export default function RecipeCollectionController() {
  const [searchText, setSearchText] = useState("");
  const [searchTerm] = useDebounce(searchText, SEARCH_DEBOUNCE_DELAY);

  const { data, loading, error } = useSearchRecipes(
    searchTerm,
    0,
    PAGINATION_LIMIT
  );

  if (error) {
    return <Error>{error.message}</Error>;
  }
  return (
    <RecipeCollectionView
      recipes={data?.paginatedRecipes.items ?? []}
      searchText={searchText}
      setSearchText={setSearchText}
      loading={loading}
    />
  );
}
