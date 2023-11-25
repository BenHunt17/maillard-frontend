import CollectionTemplate from "../../../common/template/CollectionTemplate";
import { parseDate } from "../../../common/utils/dateUtils";
import { AbridgedRecipe } from "../../data/abridgedRecipe";
import RecipeCard from "./RecipeCard";

interface RecipeCollectionViewProps {
  recipes: AbridgedRecipe[];
  searchText: string;
  setSearchText: (value: string) => void;
  loading: boolean;
}

export default function RecipeCollectionView({
  recipes,
  searchText,
  setSearchText,
  loading,
}: RecipeCollectionViewProps) {
  return (
    <CollectionTemplate
      searchText={searchText}
      setSearchText={setSearchText}
      items={recipes}
      renderItem={(recipe) => (
        <RecipeCard
          recipeName={recipe.name}
          createdAt={parseDate(recipe.creationDate)}
          imageUrl={recipe.imageUrl}
        />
      )}
      loading={loading}
    />
  );
}
