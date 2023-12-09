import { Box, styled, useTheme } from "@mui/material";

export const InfoBox = styled(Box)(() => {
  const theme = useTheme();

  return {
    padding: 8,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    boxShadow: theme.shadows[2],
  };
});
