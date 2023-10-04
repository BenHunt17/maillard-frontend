import { useAuth } from "../../../core/authentication/AuthProvider";

export default function RecipeCollectionView() {
  const { adminIsLoggedIn } = useAuth();
  console.log("meh", adminIsLoggedIn);
  return <p>Recipes</p>;
}
