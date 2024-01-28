import { zodResolver } from "@hookform/resolvers/zod";
import {
  InstructionInput,
  instructionInputSchema,
} from "../../../../data/formInputs/instructionInput";
import { useFieldArray, useForm } from "react-hook-form";
import { useUpdateRecipeInstructions } from "../../../../data/recipesService";
import { Instruction } from "../../../../data/types/RecipeResponse";
import UpdateInstructionsModalView from "../views/UpdateInstructionsModalView";

interface UpdateInstructionsModalControllerProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  recipeId: string;
  currentInstructions: Instruction[];
}

export default function UpdateInstructionsModalController({
  isOpen,
  setIsOpen,
  recipeId,
  currentInstructions,
}: UpdateInstructionsModalControllerProps) {
  const sortedCurrentInstructions = currentInstructions.sort(
    (a, b) => a.priorityNumber - b.priorityNumber
  );
  const defaultValues = {
    instructions: sortedCurrentInstructions.map((instruction) => ({
      step: instruction.step,
    })),
  };

  const formFunctions = useForm<InstructionInput>({
    defaultValues,
    resolver: zodResolver(instructionInputSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: formFunctions.control,
    name: "instructions",
  });

  const { updateInstructions, loading, error } = useUpdateRecipeInstructions(
    (result) => {},
    recipeId
  );

  const handleUpdateInstructions = (formData: InstructionInput) =>
    updateInstructions(
      formData.instructions.map((instruction, index) => ({
        priorityNumber: index + 1,
        step: instruction.step,
      }))
    );

  const addInstruction = () => append({ step: "" });

  return (
    <UpdateInstructionsModalView
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={formFunctions.handleSubmit(handleUpdateInstructions)}
      loading={loading}
      formFunctions={formFunctions}
      fields={fields}
      addInstruction={addInstruction}
      removeInstruction={remove}
    />
  );
}
