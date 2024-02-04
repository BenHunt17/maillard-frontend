import { zodResolver } from "@hookform/resolvers/zod";
import {
  InstructionInput,
  instructionInputSchema,
} from "../../../../data/formInputs/instructionInput";
import { useFieldArray, useForm } from "react-hook-form";
import { useUpdateRecipeInstructions } from "../../../../data/recipesService";
import UpdateInstructionsModalView from "../views/UpdateInstructionsModalView";
import { useRecipe } from "../../../../common/RecipeProvider";
import { ModalStateProps } from "../../../../../common/data/modalState";
import { Instruction } from "../../../../data/types/RecipeResponse";

export default function UpdateInstructionsModalController({
  isOpen,
  setIsOpen,
}: ModalStateProps) {
  const { recipe, orderedInstructions, setRecipe } = useRecipe();

  const defaultValues = getDefaultValues(orderedInstructions);

  const formFunctions = useForm<InstructionInput>({
    defaultValues,
    resolver: zodResolver(instructionInputSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: formFunctions.control,
    name: "instructions",
  });

  const { updateInstructions, loading } = useUpdateRecipeInstructions(
    (response) => {
      setRecipe(response.recipe);
      formFunctions.reset(getDefaultValues(response.recipe.instructions));
      setIsOpen(false);
    },
    recipe.id
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
      onClose={() => {
        formFunctions.reset();
        setIsOpen(false);
      }}
      onSubmit={formFunctions.handleSubmit(handleUpdateInstructions)}
      loading={loading}
      formFunctions={formFunctions}
      fields={fields}
      addInstruction={addInstruction}
      removeInstruction={remove}
    />
  );
}

function getDefaultValues(instructions: Instruction[]) {
  return {
    instructions: instructions.map((instruction) => ({
      step: instruction.step,
    })),
  };
}
