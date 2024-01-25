import { useParams } from "react-router-dom";
import { useGetRecipe } from "../../data/recipesService";
import RecipeDetailView from "../view/RecipeDetailView";
import Loading from "../../../common/components/Loading";
import Error from "../../../common/components/Error";
import RecipeOverviewView from "../view/RecipeOverviewView";
import RecipeIngredientsView from "../view/RecipeIngredientsView";
import useUpdateIngredients from "./useUpdateIngredients";
import RecipeMethodologyView from "../view/RecipeMethodologyView";

export default function RecipeDetailController() {
  const params = useParams();

  const recipeId = params.id ?? "";

  const { data, loading, error, updateResult } = useGetRecipe(recipeId);

  const { updateIngredientsModal, openUpdateIngredientsModal } =
    useUpdateIngredients(data?.recipe.ingredients ?? [], data?.recipe.id ?? "");

  if (loading) {
    return <Loading />;
  }
  if (error || !data?.recipe) {
    return <Error>{"There was an error finding the recipe :("}</Error>;
  }
  return (
    <>
      <RecipeDetailView>
        <RecipeOverviewView recipe={data.recipe} updateRecipe={updateResult} />
        <RecipeIngredientsView
          recipe={data.recipe}
          openModal={openUpdateIngredientsModal}
        />
        <RecipeMethodologyView recipe={data.recipe} openModal={() => {}} />
      </RecipeDetailView>
      {updateIngredientsModal}
    </>
  );
}
