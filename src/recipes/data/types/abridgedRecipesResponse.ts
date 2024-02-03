import { PaginatedResponse } from "../../../common/data/paginatedResponse";

export interface AbridgedRecipesResponse {
  paginatedRecipes: PaginatedResponse<AbridgedRecipe>;
}

export interface AbridgedRecipe {
  id: string;
  name: string;
  creationDate: string;
  imageUrl: string | undefined;
}
