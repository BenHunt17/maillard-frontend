import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
import Loading from "../../common/components/Loading";

const RecipeCollectionController = lazy(
  () => import("../../recipes/collection/controller/RecipeCollectionController")
);
const RecipeDetailController = lazy(
  () => import("../../recipes/detail/controller/RecipeDetailController")
);

export const recipeRoutes = (
  <>
    <Route
      path="/recipes"
      element={
        <Suspense fallback={<Loading />}>
          <RecipeCollectionController />
        </Suspense>
      }
    />
    <Route
      path="/recipes/:id"
      element={
        <Suspense fallback={<Loading />}>
          <RecipeDetailController />
        </Suspense>
      }
    />
  </>
);
