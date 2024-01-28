import { useState } from "react";
import { Instruction } from "../../data/types/RecipeResponse";
import UpdateInstructionsModalController from "../../modals/update/instructions/controllers/UpdateInstructionsModalController";

export default function useUpdateInstructions(
  currentInstructions: Instruction[],
  recipeId: string
) {
  const [showModal, setShowModal] = useState(false);

  const updateInstructionsModal = (
    <UpdateInstructionsModalController
      isOpen={showModal}
      setIsOpen={setShowModal}
      recipeId={recipeId}
      currentInstructions={currentInstructions}
    />
  );

  const openUpdateInstructionsModal = () => setShowModal(true);

  return { updateInstructionsModal, openUpdateInstructionsModal };
}
