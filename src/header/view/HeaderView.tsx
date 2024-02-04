import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import NavigationItems from "./navigationItems/NavigationItems";
import { MainGutter } from "../../common/layout/MainGutter";
import { useResponsiveLayout } from "../../common/hooks/useResponsiveLayout";

export default function HeaderView() {
  const isMobile = useResponsiveLayout("mobile");

  return (
    <AppBar position="static">
      <MainGutter>
        <Toolbar disableGutters>
          <Typography variant={isMobile ? "h6" : "h4"}>
            Maillard Recipe Manager
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <NavigationItems />
        </Toolbar>
      </MainGutter>
    </AppBar>
  );
}
