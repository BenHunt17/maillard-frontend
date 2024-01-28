import { FieldArrayWithId, UseFormReturn } from "react-hook-form";
import { InstructionInput } from "../../../../data/formInputs/instructionInput";
import ModalTemplate from "../../../../../common/template/ModalTemplate";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Delete } from "@mui/icons-material";
import FormTextField from "../../../../../common/components/formInputs/FormTextField";

interface UpdateInstructionsModalViewProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  loading: boolean;
  formFunctions: UseFormReturn<InstructionInput>;
  fields: FieldArrayWithId<InstructionInput, "instructions", "id">[];
  addInstruction: () => void;
  removeInstruction: (index: number) => void;
}

export default function UpdateInstructionsModalView({
  isOpen,
  onClose,
  onSubmit,
  loading,
  formFunctions,
  fields,
  addInstruction,
  removeInstruction,
}: UpdateInstructionsModalViewProps) {
  const theme = useTheme();

  const { isValid, isDirty } = formFunctions.formState;
  const canSubmit = isValid && isDirty;

  return (
    <ModalTemplate title="Update Ingredients" isOpen={isOpen} onClose={onClose}>
      <div
        style={{
          overflow: "auto",
        }}
      >
        {fields.map((field, index) => (
          <Box
            key={field.id}
            padding={16}
            sx={{
              display: "flex",
              backgroundColor:
                index % 2 === 0
                  ? theme.palette.grey[200]
                  : theme.palette.grey[50],
              borderRadius: 4,
              flexDirection: "column",
              gap: 8,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">{index + 1}</Typography>
              {index > 0 && (
                <IconButton onClick={() => removeInstruction(index)}>
                  <Delete />
                </IconButton>
              )}
            </Box>
            <FormTextField
              control={formFunctions.control}
              name={`instructions.${index}.step`}
              label="Instruction"
            />
          </Box>
        ))}
      </div>
      <div>
        <Button variant="outlined" onClick={addInstruction}>
          Add Instruction
        </Button>
      </div>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={loading || !canSubmit}
        >
          Submit
        </Button>
      </Box>
    </ModalTemplate>
  );
}
