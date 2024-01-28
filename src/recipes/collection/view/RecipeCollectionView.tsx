import CollectionTemplate, {
  PaginationOptions,
} from "../../../common/template/CollectionTemplate";
import { parseDate } from "../../../common/utils/dateUtils";
import { AbridgedRecipe } from "../../data/types/abridgedRecipesResponse";
import RecipeCard from "./RecipeCard";

interface RecipeCollectionViewProps {
  recipes: AbridgedRecipe[];
  searchText: string;
  paginationOptions: PaginationOptions;
  setSearchText: (value: string) => void;
  loading: boolean;
}

export default function RecipeCollectionView({
  recipes,
  searchText,
  setSearchText,
  paginationOptions,
  loading,
}: RecipeCollectionViewProps) {
  return (
    <CollectionTemplate
      searchText={searchText}
      setSearchText={setSearchText}
      paginationOptions={paginationOptions}
      items={recipes}
      renderItem={(recipe) => (
        <RecipeCard
          recipeId={recipe.id}
          recipeName={recipe.name}
          createdAt={parseDate(recipe.creationDate)}
          imageUrl={recipe.imageUrl}
        />
      )}
      loading={loading}
    />
  );
}
