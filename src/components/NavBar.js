import React, {
  Fragment,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import ForumIcon from "@mui/icons-material/Forum";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import {
  ClickAwayListener,
  Grow,
  Hidden,
  MenuList,
  Paper,
  Popper,
  Tooltip,
  AppBar,
  Avatar,
  Button,
  MenuItem,
  Typography,
  Box,
  Drawer,
  Toolbar,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import clsx from "clsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PeopleIcon from "@mui/icons-material/People";
import ConstructionIcon from "@mui/icons-material/Construction";
import MapIcon from "@mui/icons-material/Map";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArticleIcon from "@mui/icons-material/Article";
import AssessmentIcon from "@mui/icons-material/Assessment";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import { Link, useLocation, matchPath } from "react-router-dom";
import GlobalSearch from "./GlobalSearch";
import MobileViewDrawer from "./MobileViewDrawer";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginLeft: theme.spacing(7) + 1,
    width: `calc(100% - ${theme.spacing(7) + 1}px)`,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(8) + 1,
    },
    boxShadow: theme.shadow,
    backgroundColor: theme.palette.secondary.main,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginLeft: 0,
    },
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  drawer: {
    zIndex: theme.zIndex.appBar + 1,
    minWidth: theme.spacing(10),
    flexShrink: 0,
  },
  navlist: {
    paddingTop: 16,
  },
  menuLink: {
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8) + 1,
    },
  },

  appBarToolbar: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    backgroundColor: theme.palette.secondary.main,
  },
  accountAvatar: {
    marginLeft: theme.spacing(-2.6),
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(-1.6),
    },
  },
  smBordered: {
    [theme.breakpoints.down("xs")]: {
      borderRadius: "50% !important",
    },
  },
  iconListItem: {
    width: "auto",
    borderRadius: theme.shape.borderRadius,
    paddingTop: 11,
    paddingBottom: 11,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  textPrimary: {
    color: theme.palette.primary.contrastText,
  },
  username: {
    paddingLeft: 0,
    paddingRight: theme.spacing(2),
  },
  small: {
    marginRight: theme.spacing(3),
  },
  accountButton: {
    paddingRight: theme.spacing(4),
  },
}));

function Navbar({ user, children }) {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const matchLgDown = useMediaQuery(theme.breakpoints.down("lg"));

  const links = useRef([]);

  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [open, setOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const anchorRef = useRef(null);

  const match = (path) => (path ? !!matchPath({ path, end: false }, location.pathname) : false);

  const handleAccountToggle = () => {
    setOpenAccount((prevOpen) => !prevOpen);
  };

  const handleAccountClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenAccount(false);
  };

  const handleAccountListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenAccount(false);
    }
  };

  const prevOpen = useRef(openAccount);

  useEffect(() => {
    if (prevOpen.current === true && openAccount === false) {
      anchorRef?.current?.focus();
    }

    prevOpen.current = openAccount;
  }, [openAccount]);

  const handleDrawerOpenClose = () => {
    setOpen(!open);
  };

  const openMobileDrawer = useCallback(() => {
    setIsMobileOpen(true);
  }, [setIsMobileOpen]);

  const closeMobileDrawer = useCallback(() => {
    setIsMobileOpen(false);
  }, [setIsMobileOpen]);

  const menuItems = [
    {
      link: "/dashboard",
      name: "Dashboard",
      displayName: t("menu.dashboard"),
      onClick: closeMobileDrawer,
      icon: <DashboardIcon />,
    },
    {
      link: "/schedule",
      name: "Schedule",
      displayName: t("menu.schedule"),
      onClick: closeMobileDrawer,
      icon: <CalendarTodayIcon />,
    },
    {
      link: "/map",
      name: "Map",
      displayName: t("menu.map"),
      onClick: closeMobileDrawer,
      icon: <MapIcon />,
    },
    {
      link: "/clients",
      name: "Clients",
      displayName: t("menu.clients"),
      onClick: closeMobileDrawer,
      icon: <PeopleIcon />,
    },
    {
      link: "/jobs",
      name: "Jobs",
      displayName: t("menu.jobs"),
      onClick: closeMobileDrawer,
      icon: <ConstructionIcon />,
    },
    {
      link: "/invoice",
      name: "Invoice",
      displayName: t("menu.invoice"),
      onClick: closeMobileDrawer,
      icon: <ArticleIcon />,
    },
    {
      link: "/reports",
      name: "Reports",
      displayName: t("menu.reports"),
      onClick: closeMobileDrawer,
      icon: <AssessmentIcon />,
    },
    {
      link: "/request",
      name: "Request",
      displayName: t("menu.request"),
      onClick: closeMobileDrawer,
      icon: <FileDownloadIcon />,
    },
    {
      link: "/quotes",
      name: "Quotes",
      displayName: t("menu.quotes"),
      onClick: closeMobileDrawer,
      icon: <RequestPageIcon />,
    },
  ];

  const location = useLocation();
  const url = location.pathname;

  useEffect(() => {
    if ([`/customer`].includes(url)) {
      setSelectedTab("Customer");
    } else if ([`/product`].includes(url)) {
      setSelectedTab("Product");
    } else if ([`/category`].includes(url)) {
      setSelectedTab("Category");
    } else if ([`/order`].includes(url)) {
      setSelectedTab("Order");
    }
  }, [url]);

  return (
    <Fragment>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.appBarToolbar}>
          <Box display="flex" alignItems="center">
            <Hidden smUp>
              <Box mr={1}>
                <IconButton
                  aria-label="Open Navigation"
                  onClick={openMobileDrawer}
                >
                  <MenuIcon
                    sx={{
                      color: theme.palette.primary.main,
                    }}
                  />
                </IconButton>
              </Box>
            </Hidden>
          </Box>

          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width={matchLgDown ? "100%" : "50%"}
          >
            <Box display="flex" width="30%" className={classes.small}>
              <Hidden smDown>
                <GlobalSearch />
              </Hidden>
            </Box>
            
            <Link to='/settings'>
              <Avatar variant="rounded" className={classes.small}>
                <SettingsIcon />
              </Avatar>
            </Link>

            <Avatar variant="rounded" className={classes.small}>
              <ForumIcon />
            </Avatar>
            <Avatar variant="rounded" className={classes.small}>
              <LocalPhoneIcon />
            </Avatar>
            <Hidden mdDown>
              <Button
                variant="contained"
                color="primary"
                endIcon={<ExpandMoreIcon />}
                className={classes.accountButton}
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={(e) => {
                  handleAccountToggle();
                  if (openAccount) {
                    setOpenAccount(false);
                  } else {
                    anchorRef.current = e.currentTarget;
                  }
                }}
              >
                {`Hello, ${user?.displayName || ""}`}
              </Button>
            </Hidden>
            <IconButton
              onClick={(e) => {
                handleAccountToggle();
                if (openAccount) {
                  setOpenAccount(false);
                } else {
                  anchorRef.current = e.currentTarget;
                }
              }}
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
            >
              <Avatar
                alt={user?.displayName?.toUpperCase()}
                // src={`${process.env.PUBLIC_URL}/images/profilePicture.jpg`}
                className={classes.accountAvatar}
              />
            </IconButton>
            <Popper
              open={openAccount}
              anchorEl={anchorRef?.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper sx={{ width: "10rem" }}>
                    <ClickAwayListener onClickAway={handleAccountClose}>
                      <MenuList
                        autoFocusItem={openAccount}
                        id="menu-list-grow"
                        onKeyDown={handleAccountListKeyDown}
                      >
                        <MenuItem onClick={(e) => {}}>
                          <Typography variant="h4">Profile</Typography>
                        </MenuItem>
                        <MenuItem onClick={(e) => {}}>
                          <Typography variant="h4">Reset Password</Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            // logout();
                          }}
                        >
                          <Typography variant="h4">Logout</Typography>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Box>
        </Toolbar>
      </AppBar>

      <Hidden smDown>
        <Drawer //  both drawers can be combined into one for performance
          variant="permanent"
          open={true}
          anchor="left"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          sx={{
            "& .MuiDrawer-paper": {
              bgcolor: theme.palette.secondary.main,
            },
          }}
        >
          <div className={classes.toolbar}>
            <Tooltip
              title={open ? "Collapse Menu" : "Expand Menu"}
              placement="right"
            >
              <Box
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                onClick={handleDrawerOpenClose}
                sx={{ cursor: "pointer" }}
              >
                <>
                  <Typography
                    variant="h2"
                    sx={{ display: "inline-block", userSelect: "none" }}
                    color="primary"
                  >
                    F
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      display: "inline-block",
                      userSelect: "none",
                      color: theme.palette.primary.contrastText,
                    }}
                  >
                    S
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{ display: "inline-block", userSelect: "none" }}
                    color="primary"
                  >
                    M
                  </Typography>
                </>
              </Box>
            </Tooltip>
          </div>
          <Divider />
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
                    selected={match((element.name).toLowerCase() )}
                    button
                    divider={index !== menuItems.length - 1}
                    onClick={() => {
                      links.current[index].click();
                      setSelectedTab(element.name);
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
                          match((element.name).toLowerCase() )
                            ? theme.palette.primary.main
                            : theme.palette.primary.contrastText,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {element.icon}
                    </ListItemIcon>
                    {open && (
                      <ListItemText
                        sx={{
                          color:
                            match((element.name).toLowerCase() )
                              ? theme.palette.primary.main
                              : theme.palette.primary.contrastText,
                          paddingLeft: theme.spacing(1),
                        }}
                      >
                        <Typography variant="h4">
                          {element.displayName}
                        </Typography>
                      </ListItemText>
                    )}
                  </ListItem>
                </Tooltip>
              </Link>
            ))}
          </List>
        </Drawer>
      </Hidden>

      <MobileViewDrawer
        menuItems={menuItems.map((element) => ({
          link: element.link,
          name: element.name,
          displayName: element.displayName,
          icon: element.icon,
          onClick: element.onClick,
        }))}
        open={isMobileOpen}
        selectedItem={selectedTab}
        setSelectedItem={setSelectedTab}
        onClose={closeMobileDrawer}
      />
    </Fragment>
  );
}

export default Navbar;
