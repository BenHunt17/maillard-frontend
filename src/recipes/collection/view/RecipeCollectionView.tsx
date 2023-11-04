import { useAuth } from "../../../core/authentication/AuthProvider";

export default function RecipeCollectionView() {
  const { adminIsLoggedIn } = useAuth();
  
  return <p>Recipes</p>;
}
