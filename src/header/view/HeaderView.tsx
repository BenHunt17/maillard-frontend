import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import NavigationItems from "./navigationItems/NavigationItems";
import { MainGutter } from "../../common/layout/MainGutter";

export default function HeaderView() {
  return (
    <AppBar position="static">
      <MainGutter>
        <Toolbar disableGutters>
          <Typography variant="h4">Maillard Recipe Manager</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <NavigationItems />
        </Toolbar>
      </MainGutter>
    </AppBar>
  );
}
