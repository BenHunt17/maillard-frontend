import { ReactNode, createContext, useContext, useState } from "react";
import { Instruction, Recipe } from "../data/types/RecipeResponse";

interface RecipeContextProps {
  recipe: Recipe;
  setRecipe: (recipe: Recipe) => void;
  orderedInstructions: Instruction[];
}

interface RecipeProviderProps {
  children: ReactNode;
  initialRecipe: Recipe;
}

const RecipeContext = createContext<RecipeContextProps | undefined>(undefined);

export function RecipeProvider({
  children,
  initialRecipe,
}: RecipeProviderProps) {
  const [recipe, setRecipe] = useState<Recipe>(initialRecipe);

  const orderedInstructions = recipe.instructions.sort(
    (a, b) => a.priorityNumber - b.priorityNumber
  );

  return (
    <RecipeContext.Provider
      value={{
        recipe,
        setRecipe,
        orderedInstructions,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipe() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipe must be used within a RecipeProvider");
  }
  return context;
}
