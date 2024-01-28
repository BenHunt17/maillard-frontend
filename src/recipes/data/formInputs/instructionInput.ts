import z from "zod";

export const instructionInputSchema = z.object({
  instructions: z.array(z.object({ step: z.string().min(1).max(512) })),
});

export type InstructionInput = z.infer<typeof instructionInputSchema>;
