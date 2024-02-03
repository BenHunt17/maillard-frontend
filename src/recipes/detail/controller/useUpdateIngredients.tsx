import { useState } from "react";
import UpdateIngredientsModalController from "../../modals/update/ingredients/controllers/UpdateIngredientsModalController";

export default function useUpdateIngredients() {
  const [showModal, setShowModal] = useState(false);

  const updateIngredientsModal = (
    <UpdateIngredientsModalController
      isOpen={showModal}
      setIsOpen={setShowModal}
    />
  );

  const openUpdateIngredientsModal = () => setShowModal(true);

  return { updateIngredientsModal, openUpdateIngredientsModal };
}
