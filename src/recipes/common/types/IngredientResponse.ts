export interface IngredientResponse {
  ingredients: IngredientSearchResult[];
}

interface IngredientSearchResult {
  externalId: string;
  name: string;
}
