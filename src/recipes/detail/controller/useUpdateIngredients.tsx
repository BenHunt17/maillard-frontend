import { useState } from "react";
import UpdateIgredientsModalController from "../../modals/update/ingredients/controllers/UpdateIgredientsModalController";
import { Ingredient } from "../../data/types/RecipeResponse";

export default function useUpdateIngredients(
  currentIngredients: Ingredient[],
  recipeId: string
) {
  const [showModal, setShowModal] = useState(false);

  const updateIngredientsModal = (
    <UpdateIgredientsModalController
      isOpen={showModal}
      setIsOpen={setShowModal}
      recipeId={recipeId}
      currentIngredients={currentIngredients}
    />
  );

  const openUpdateIngredientsModal = () => setShowModal(true);

  return { updateIngredientsModal, openUpdateIngredientsModal };
}
