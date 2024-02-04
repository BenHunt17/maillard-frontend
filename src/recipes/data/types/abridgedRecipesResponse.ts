import { PaginatedResponse } from "../../../common/data/paginatedResponse";
import { Maybe } from "../../../core/utils/types";

export interface AbridgedRecipesResponse {
  paginatedRecipes: Maybe<PaginatedResponse<AbridgedRecipe>>;
}

export interface AbridgedRecipe {
  id: Maybe<string>;
  name: Maybe<string>;
  creationDate: Maybe<string>;
  imageUrl: Maybe<string | undefined>;
}
