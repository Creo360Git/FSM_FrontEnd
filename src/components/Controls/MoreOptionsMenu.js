import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/styles";

export default function MoreOptionsMenu(menuItems, anchorEl, setAnchorEl) {
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ))(() => ({
    "& .MuiPaper-root": {
      borderRadius: 2,
      boxShadow:
        "0px 1px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",

      "&:hover": {
        boxShadow:
          "0px 1px 1px -1px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
      },
    },
  }));

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <StyledMenu
      id="long-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={closeMenu}
      PaperProps={{
        style: {
          minWidth: "10rem",
        },
      }}
      style={{ borderRadius: 20 }}
    >
      {menuItems.map((menuItem, i) => (
        <MenuItem
          key={i}
          onClick={menuItem.onClick}
          style={{
            color: menuItem.color,
          }}
        >
          {menuItem.label}
        </MenuItem>
      ))}
    </StyledMenu>
  );
}
