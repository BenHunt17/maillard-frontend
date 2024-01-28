import { useState } from "react";
import { Ingredient } from "../../data/types/RecipeResponse";
import UpdateIngredientsModalController from "../../modals/update/ingredients/controllers/UpdateIngredientsModalController";

export default function useUpdateIngredients(
  currentIngredients: Ingredient[],
  recipeId: string
) {
  const [showModal, setShowModal] = useState(false);

  const updateIngredientsModal = (
    <UpdateIngredientsModalController
      isOpen={showModal}
      setIsOpen={setShowModal}
      recipeId={recipeId}
      currentIngredients={currentIngredients}
    />
  );

  const openUpdateIngredientsModal = () => setShowModal(true);

  return { updateIngredientsModal, openUpdateIngredientsModal };
}
