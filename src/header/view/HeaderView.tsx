import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import NavigationItems from "./navigationItems/NavigationItems";

export default function HeaderView() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4">Maillard Recipe Manager</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <NavigationItems />
      </Toolbar>
    </AppBar>
  );
}
