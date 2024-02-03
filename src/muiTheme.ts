import { createTheme } from "@mui/material";

export const theme = createTheme({
  //TODO - Properly make the typography/colour pallete
  palette: {
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
  spacing: 3,
});
