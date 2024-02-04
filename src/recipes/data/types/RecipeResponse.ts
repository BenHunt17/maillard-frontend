import { Maybe } from "../../../core/utils/types";

//Optional TODO - maybe make a recursive type for this maybe stuff

export interface RecipeResponse {
  recipe: Maybe<Recipe>;
}

export interface Recipe {
  id: Maybe<string>;
  name: Maybe<string>;
  creationDate: Maybe<Date>;
  imageUrl: Maybe<string | undefined>;
  description: Maybe<string | undefined>;
  ingredients: Maybe<Ingredient[]>;
  instructions: Maybe<Instruction[]>;
  data: Maybe<{
    prepTime: Maybe<number>;
    cookTime: Maybe<number>;
    washingUpTime: Maybe<number>;
  }>;
  nutrients: Maybe<Nutrient[]>;
}

export interface Ingredient {
  id: Maybe<string>;
  name: Maybe<string>;
  quantity: Maybe<number>;
  displayLabel: Maybe<string | undefined>;
  externalId: Maybe<string>;
}

export interface Instruction {
  id: Maybe<string>;
  priorityNumber: Maybe<number>;
  step: Maybe<string>;
}

export interface Nutrient {
  number: Maybe<number>;
  name: Maybe<string>;
  value: Maybe<number>;
  unitName: Maybe<string>;
}
