import { Menu as MenuIcon } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavigationItemsHamburger() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <IconButton
        size="large"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        color="secondary"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem>
          <NavLink to="/recipes" className="nav-item">
            <Typography variant="body1">Recipes</Typography>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/meal-plans" className="nav-item">
            <Typography variant="body1">Meal Plans</Typography>
          </NavLink>
        </MenuItem>
      </Menu>
    </>
  );
}
