import { Box, Typography } from "@mui/material";

export default function AppLoaderView() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      height="100vh"
      alignItems="center"
    >
      <Typography variant="h6">Loading</Typography>
      {/* TODO - make loading component */}
    </Box>
  );
}
