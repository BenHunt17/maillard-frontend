import { Box, Typography } from "@mui/material";
import NavigationItemsHamburger from "./NavigationItemsHamburger";
import { NavLink } from "react-router-dom";
import { useResponsiveLayout } from "../../../common/hooks/useResponsiveLayout";

export default function NavigationItems() {
  const isMobile = useResponsiveLayout("mobile");

  if (isMobile) {
    return <NavigationItemsHamburger />;
  }
  return (
    <Box display="flex" gap={4}>
      <NavLink to="/recipes" className={"nav-item"}>
        <Typography variant="body1" sx={{ color: "white" }}>
          Recipes
        </Typography>
      </NavLink>
      <NavLink to="/meal-plans" className="nav-item">
        <Typography variant="body1" sx={{ color: "white" }}>
          Meal Plans
        </Typography>
      </NavLink>
    </Box>
  );
}
