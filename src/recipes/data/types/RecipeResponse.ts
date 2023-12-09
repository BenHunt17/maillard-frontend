export interface RecipeResponse {
  recipe: Recipe;
}

export interface Recipe {
  id: string;
  name: string;
  creationDate: Date;
  imageUrl: string | undefined;
  description: string | undefined;
  ingredients: Ingredient[];
  instructions: Instruction[];
  data: {
    prepTime: number;
    cookTime: number;
    washingUpTime: number;
  };
  nutrients: Nutrient[];
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  displayLabel: string | undefined;
  externalId: string;
}

export interface Instruction {
  id: string;
  priorityNumber: number;
  step: string;
}

export interface Nutrient {
  name: string;
  value: number;
  unitName: string;
}
