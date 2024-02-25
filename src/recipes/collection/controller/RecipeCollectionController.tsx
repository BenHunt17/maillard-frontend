import { useState } from "react";
import { useSearchRecipes } from "../../data/recipesService";
import RecipeCollectionView from "../view/RecipeCollectionView";
import { useDebounce } from "use-debounce";
import {
  PAGINATION_LIMIT,
  SEARCH_DEBOUNCE_DELAY,
} from "../../../common/utils/constants";
import Error from "../../../common/components/Error";
import CreateRecipeModelController from "../../modals/create/controller/CreateRecipeModalController";

export default function RecipeCollectionController() {
  const [searchText, setSearchText] = useState("");
  const [searchTerm] = useDebounce(searchText, SEARCH_DEBOUNCE_DELAY);

  const [isOpen, setIsOpen] = useState(false);

  const [offset, setOffset] = useState(0);

  const { data, loading, error } = useSearchRecipes(
    searchTerm,
    offset,
    PAGINATION_LIMIT
  );

  const page = Math.ceil(offset / PAGINATION_LIMIT) + 1;
  const total = data?.paginatedRecipes?.total ?? 0;

  if (error) {
    return <Error>{error.message}</Error>;
  }
  return (
    <>
      <RecipeCollectionView
        recipes={data?.paginatedRecipes?.items ?? []}
        searchText={searchText}
        setSearchText={setSearchText}
        paginationOptions={{
          page,
          total,
          setPage: (value) => setOffset(PAGINATION_LIMIT * (value - 1)),
        }}
        loading={loading}
        openModal={() => setIsOpen(true)}
      />
      <CreateRecipeModelController isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
