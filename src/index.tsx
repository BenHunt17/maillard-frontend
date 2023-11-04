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
import App from "./App";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import AppLoaderController from "./appLoader/controller/AppLoaderController";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<AppLoaderController />} />
      <Route path="/login" element={<LoginController />} />
      <Route element={<App />}>
        <Route path="/recipes" element={<RecipeCollectionController />} />
      </Route>
    </Route>
  )
);

const theme = createTheme({
  //TODO - put this into another file and properly make the typography/colour pallete
  palette: {
    secondary: { main: "#ffffff" },
    background: { default: "#e0e0e0" },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    body1: {
      color: "#424242",
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
