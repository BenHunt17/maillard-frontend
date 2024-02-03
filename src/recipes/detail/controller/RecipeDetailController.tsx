import { useParams } from "react-router-dom";
import { useGetRecipe } from "../../data/recipesService";
import RecipeDetailView from "../view/RecipeDetailView";
import Loading from "../../../common/components/Loading";
import Error from "../../../common/components/Error";
import RecipeOverviewView from "../view/RecipeOverviewView";
import RecipeIngredientsView from "../view/RecipeIngredientsView";
import useUpdateIngredients from "./useUpdateIngredients";
import RecipeMethodologyView from "../view/RecipeMethodologyView";
import useUpdateInstructions from "./useUpdateInstructions";
import { RecipeProvider } from "../../common/RecipeProvider";

export default function RecipeDetailController() {
  const params = useParams();

  const recipeId = params.id ?? "";

  const { data, loading, error } = useGetRecipe(recipeId);

  const { updateIngredientsModal, openUpdateIngredientsModal } =
    useUpdateIngredients();

  const { updateInstructionsModal, openUpdateInstructionsModal } =
    useUpdateInstructions();

  if (loading) {
    return <Loading />;
  }
  if (error || !data?.recipe) {
    return <Error>{"There was an error finding the recipe :("}</Error>;
  }
  return (
    <RecipeProvider initialRecipe={data.recipe}>
      <RecipeDetailView>
        <RecipeOverviewView />
        <RecipeIngredientsView openModal={openUpdateIngredientsModal} />
        <RecipeMethodologyView openModal={openUpdateInstructionsModal} />
      </RecipeDetailView>
      {updateIngredientsModal}
      {updateInstructionsModal}
    </RecipeProvider>
  );
}
