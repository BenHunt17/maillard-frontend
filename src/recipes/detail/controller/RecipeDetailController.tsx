import { useParams } from "react-router-dom";
import { useGetRecipe } from "../../data/recipesService";
import RecipeDetailView from "../view/RecipeDetailView";
import Loading from "../../../common/components/Loading";
import Error from "../../../common/components/Error";

export default function RecipeDetailController() {
  const params = useParams();

  const recipeId = params.id ?? "";

  const { data, loading, error } = useGetRecipe(recipeId);

  if (loading) {
    return <Loading />;
  }
  if (error || !data?.recipe) {
    return <Error>{"There was an error finding the recipe :("}</Error>;
  }
  return <RecipeDetailView recipe={data?.recipe} />;
}
