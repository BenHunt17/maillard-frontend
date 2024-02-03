import { useParams } from "react-router-dom";
import { useGetRecipe } from "../../data/recipesService";
import RecipeDetailView from "../view/RecipeDetailView";
import Loading from "../../../common/components/Loading";
import Error from "../../../common/components/Error";
import RecipeOverviewView from "../view/RecipeOverviewView";
import RecipeIngredientsView from "../view/RecipeIngredientsView";
import RecipeMethodologyView from "../view/RecipeMethodologyView";
import { RecipeProvider } from "../../common/RecipeProvider";
import UpdateInstructionsModalController from "../../modals/update/instructions/controllers/UpdateInstructionsModalController";
import { useState } from "react";
import UpdateIngredientsModalController from "../../modals/update/ingredients/controllers/UpdateIngredientsModalController";
import RecipeImageController from "./RecipeImageController";

export default function RecipeDetailController() {
  const params = useParams();

  const [ingredientsModalIsOpen, setIngredientsModalIsOpen] = useState(false);
  const [instructionsModalIsOpen, setInstructionsModalIsOpen] = useState(false);

  const recipeId = params.id ?? "";

  const { data, loading, error } = useGetRecipe(recipeId);

  if (loading) {
    return <Loading />;
  }
  if (error || !data?.recipe) {
    return <Error>{"There was an error finding the recipe :("}</Error>;
  }
  return (
    <RecipeProvider initialRecipe={data.recipe}>
      <RecipeDetailView>
        <RecipeOverviewView recipeImage={<RecipeImageController />} />
        <RecipeIngredientsView
          openModal={() => setIngredientsModalIsOpen(true)}
        />
        <RecipeMethodologyView
          openModal={() => setInstructionsModalIsOpen(true)}
        />
      </RecipeDetailView>
      <UpdateIngredientsModalController
        isOpen={ingredientsModalIsOpen}
        setIsOpen={setIngredientsModalIsOpen}
      />
      <UpdateInstructionsModalController
        isOpen={instructionsModalIsOpen}
        setIsOpen={setInstructionsModalIsOpen}
      />
    </RecipeProvider>
  );
}
