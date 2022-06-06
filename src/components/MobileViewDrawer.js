import React, { Fragment, useRef } from "react";
import {
  Tooltip,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlist: {
    paddingTop: 16,
  },
  menuLink: {
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
  },
}));

function MobileViewDrawer(props) {
  const { menuItems, open, selectedItem, setSelectedItem, onClose } = props;

  const classes = useStyles();
  const theme = useTheme();

  const links = useRef([]);

  const toggleDrawer = (event) => {
    if (event.key === "Tab" || event.key === "Shift") {
      return;
    }
    onClose();
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List className={classes.navlist} sx={{ padding: 0 }}>
        {menuItems?.map((element, index) => (
          <Link
            to={element.link}
            onClick={element.onClick}
            key={index}
            ref={(node) => {
              links.current[index] = node;
              return node;
            }}
            className={classes.menuLink}
          >
            <Tooltip
              title={element.displayName}
              placement="right"
              key={element.name}
            >
              <ListItem
                selected={selectedItem === element.name}
                button
                divider={index !== menuItems.length - 1}
                onClick={() => {
                  links.current[index].click();
                  setSelectedItem(element.name);
                }}
                aria-label={`Go to ${element.name}`}
                sx={{
                  paddingTop: theme.spacing(2),
                  paddingBottom: theme.spacing(2),
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      selectedItem === element.name
                        ? theme.palette.primary.main
                        : theme.palette.primary.contrastText,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {element.icon}
                </ListItemIcon>

                <ListItemText
                  sx={{
                    color:
                      selectedItem === element.name
                        ? theme.palette.primary.main
                        : theme.palette.primary.contrastText,
                    paddingLeft: theme.spacing(1),
                  }}
                >
                  <Typography variant="h4">{element.displayName}</Typography>
                </ListItemText>
              </ListItem>
            </Tooltip>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Fragment>
      <Drawer
        anchor={"left"}
        open={open}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            bgcolor: theme.palette.secondary.main,
          },
        }}
      >
        {list()}
      </Drawer>
    </Fragment>
  );
}

export default MobileViewDrawer;
