import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import NavigationItemsHamburger from "./NavigationItemsHamburger";
import { NavLink } from "react-router-dom";

export default function NavigationItems() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  if (matches) {
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
