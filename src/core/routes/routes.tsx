import { Suspense, lazy } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Loading from "../../common/components/Loading";
import { recipeRoutes } from "./RecipeRoutes";

const App = lazy(() => import("../../App"));

const LoginController = lazy(
  () => import("../../login/controller/LoginController")
);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        index
        element={
          <Suspense fallback={<Loading />}>
            <LoginController />
          </Suspense>
        }
      />
      <Route
        element={
          <Suspense fallback={<Loading />}>
            <App />
          </Suspense>
        }
      >
        {recipeRoutes}
      </Route>
    </Route>
  )
);
