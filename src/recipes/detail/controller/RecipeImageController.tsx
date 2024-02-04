import Img from "../../../common/components/img/Img";
import { Maybe } from "../../../core/utils/types";
import { useRecipe } from "../../common/RecipeProvider";
import {
  useRemoveRecipeImage,
  useUploadRecipeImage,
} from "../../data/recipesService";
import { RecipeResponse } from "../../data/types/RecipeResponse";

export default function RecipeImageController() {
  const { recipe, setRecipe } = useRecipe();

  const updateRecipe = (response: Maybe<RecipeResponse>) => {
    if (response?.recipe) {
      setRecipe(response.recipe);
    }
  };

  const { callback: removeRecipeImage, loading: removeRecipeImageLoading } =
    useRemoveRecipeImage(recipe.id ?? "", updateRecipe);
  const { callback: uploadRecipeImage, loading: uploadRecipeImageLoading } =
    useUploadRecipeImage(recipe.id ?? "", updateRecipe);

  return (
    <Img
      src={recipe.imageUrl}
      alt={recipe.name}
      onUpload={uploadRecipeImage}
      onRemove={removeRecipeImage}
      isLoading={removeRecipeImageLoading || uploadRecipeImageLoading}
    />
  );
}
