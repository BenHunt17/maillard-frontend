import z from "zod";

const timeFormatRegex = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;

export const recipeCreateInputSchema = z.object({
  name: z
    .string()
    .min(1, { message: "required field" })
    .max(255, { message: "name cannot exceed 255 characters" }),
  description: z
    .string()
    .max(512, { message: "description cannot exceed 255 characters" })
    .optional(),
  data: z.object({
    prepTime: z
      .string()
      .min(1, { message: "required field" })
      .regex(timeFormatRegex, "Invalid time format (HH:mm)"),
    cookTime: z
      .string()
      .min(1, { message: "required field" })
      .regex(timeFormatRegex, "Invalid time format (HH:mm)"),
    washingUpTime: z
      .string()
      .min(1, { message: "required field" })
      .regex(timeFormatRegex, "Invalid time format (HH:mm)"),
  }),
});

export type RecipeCreateInput = z.infer<typeof recipeCreateInputSchema>;
