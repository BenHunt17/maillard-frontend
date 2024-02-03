import { useState } from "react";
import UpdateInstructionsModalController from "../../modals/update/instructions/controllers/UpdateInstructionsModalController";

export default function useUpdateInstructions() {
  const [showModal, setShowModal] = useState(false);

  const updateInstructionsModal = (
    <UpdateInstructionsModalController
      isOpen={showModal}
      setIsOpen={setShowModal}
    />
  );

  const openUpdateInstructionsModal = () => setShowModal(true);

  return { updateInstructionsModal, openUpdateInstructionsModal };
}
