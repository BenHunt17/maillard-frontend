import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./core/authentication/AuthProvider";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LoginController from "./login/controller/LoginController";
import RecipeCollectionController from "./recipes/collection/controller/RecipeCollectionController";
import HeaderView from "./header/view/HeaderView";
import App from "./App";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<App />} />
      <Route path="/login" element={<LoginController />} />
      <Route element={<HeaderView />}>
        <Route path="/recipes" element={<RecipeCollectionController />} />
      </Route>
    </Route>
  )
);

const theme = createTheme({
  //TODO - put this into another file and properly make the typography/colour pallete
  palette: {
    background: { default: "#e0e0e0" },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    h6: {
      fontWeight: "bold",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
