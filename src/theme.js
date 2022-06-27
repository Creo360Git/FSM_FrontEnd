import { createTheme } from "@mui/material/styles";

// colors
const primary = "#ffffff";
const black = "#08134A";
const darkBlack = "rgb(36, 40, 44)";
const background = "#F9F9F9";
const warningLight = "rgba(253, 200, 69, .3)";
const warningMain = "rgba(253, 200, 69, 1)";
const warningDark = "rgba(253, 200, 69, .7)";
const danger = "#FF3D3D";
const darkBackground = "#f2f2f2";
const focusBackground = "#E9ECFF";

// border
const borderWidth = 2;
const borderColor = "rgba(0, 0, 0, 0.13)";

// spacing
const spacing = 8;

const theme = createTheme({
  palette: {
    primary: {
      light: "#39426e",
      main: "#08134A",
      dark: "#050d33",
      contrastText: "#fff",
    },
    secondary: {
      light: "#80d4ff",
      main: "#457CCE",
      dark: "#31568f",
      contrastText: "#fff",
    },
    common: {
      black: black,
      darkBlack: darkBlack,
      danger: danger,
    },
    warning: {
      light: warningLight,
      main: warningMain,
      dark: warningDark,
    },
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    background: {
      default: background,
      dark: darkBackground,
      button: focusBackground,
    },
    spacing,
  },
  shadow: `0px 14px 40px #F5F7FF`,
  border: {
    borderColor: borderColor,
    borderWidth: borderWidth,
  },
  breakpoints: {
    values: {
      md: 900,
      lg: 1500,
      xl: 1700,
    },
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          color: black,
          backgroundColor: focusBackground,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          backgroundColor: focusBackground,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: "1rem",
          fontWeight: 450,
        },
        root: {
          fontSize: "1rem",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          padding: 0,
          marginTop: 0,
          textAlign: "center",
          "&::before": {
            display: "none",
          },
          height: "2.5rem",
          color: "#000",
          borderRadius: "5px",
          backgroundColor: focusBackground,
        },
        input: {
          height: "1.56rem",
          fontSize: "1rem",
          width: "100%",
          paddingLeft: spacing,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiExpansionPanel: {
      styleOverrides: {
        root: {
          position: "static",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: borderColor,
          height: borderWidth,
        },
      },
    },
    MuiPrivateNotchedOutline: {
      styleOverrides: {
        root: {
          borderWidth: borderWidth,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: primary,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        divider: {
          borderBottom: `${0}px solid ${borderColor}`,
        },
        root: {
          "&$selected": {
            backgroundColor: "#FAFBFF",
            borderLeft: "4px solid #30D0B6",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          width: "100%",
          // maxWidth: 430,
          marginLeft: spacing,
          marginRight: spacing,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: black,
          fontSize: "12px",
        },
        arrow: {
          color: black,
        },
      },
    },
    MuiDropzoneArea: {
      styleOverrides: {
        root: {
          color: "#050d33",
          border: `2px solid ${borderColor}`,
        },
        icon: {
          color: "#050d33",
          fontSize: "3rem !important",
        },
        text: {
          padding: "3rem",
          fontSize: "1.1rem !important",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: { boxShadow: "none" },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: focusBackground,
          borderRadius: "4px",
        },
        expandIcon: {
          backgroundColor: "#abb2d4",
          color: "#fff",
          padding: "1px",
          marginRight: "1px",
          "&:hover": {
            backgroundColor: "#abb2d4",
          },
        },
      },
    },
    MuiTreeItem: {
      styleOverrides: {
        root: {
          fontSize: 15,
          color: "#808080",
          "&$selected > $content $label": {
            backgroundColor: "transparent",
          },
          "&$selected > $content $label:hover, &$selected:focus > $content $label":
            {
              backgroundColor: "transparent",
            },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: primary,
        },
        colorSecondary: {
          "&$checked": {
            color: primary,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem",
        },
        select: {
          "&:focus": {
            backgroundColor: "none",
          },
        },
      },
    },
    MuiNativeSelect: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontWeight: 450,
        },
      },
    },
    TableContainer: {
      styleOverrides: {
        root: {
          "@media print": {
            overflow: "visible !important",
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          "@media print": {
            display: "none",
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        head: {
          backgroundColor: black,
          "@media print": {
            backgroundColor: "#fff",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontWeight: 450,
        },
        head: {
          color: "#fff",
          "@media print": {
            color: "#000  !important",
          },
          backgroundColor: "#08134A",
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: "#fff !important",
          "@media print": {
            color: "#000  !important",
          },
        },
        icon: {
          color: "#fff !important",
          "@media print": {
            color: "#000  !important",
          },
        },
      },
    },
    MUIDataTableHeadCell: {
      styleOverrides: {
        fixedHeader: {
          color: "#fff",
          textTransform: "uppercase",
          backgroundColor: "#457CCE",
          "@media print": {
            color: "#000  !important",
          },
        },
      },
    },
  },

  typography: {
    fontFamily: "'Poppins','Helvetica','Arial', sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontSize: "1.8rem",
      color: "#08134A",
      fontWeight: 600,
      "@media (min-width:1536px)": {
        fontSize: "2rem",
      },
    },
    h2: {
      fontSize: "1.4rem",
      letterSpacing: "0px",
      fontWeight: 600,
      "@media (min-width:1536px)": {
        fontSize: "1.70rem",
      },
    },
    h3: {
      fontSize: "0.8rem",
      letterSpacing: "0px",
      fontWeight: 600,
      "@media (min-width:1536px)": {
        fontSize: "1.1rem",
      },
    },
    h4: {
      fontSize: "0.9rem",
      letterSpacing: "0px",
      fontWeight: 500,
      "@media (min-width:1536px)": {
        fontSize: "1rem",
      },
    },
    h5: {
      fontSize: "0.86rem",
      fontWeight: 400,
      "@media (min-width:1536px)": {
        fontSize: "0.96rem",
      },
    },
    h6: {
      fontSize: "0.75rem",
      fontWeight: 400,
      "@media (min-width:1536px)": {
        fontSize: "0.8rem",
      },
    },
    body1: {
      fontSize: "0.75rem",
      fontWeight: 400,
      "@media (min-width:1536px)": {
        fontSize: "1rem",
      },
    },
    subtitle1: {
      fontSize: "0.8rem",
      color: "#969BA0",
      "@media (min-width:1536px)": {
        fontSize: "1.1rem",
      },
    },
    subtitle2: {
      fontSize: "0.4rem",
      color: "#08134A",
      fontWeight: 500,
      opacity: 0.3,
      "@media (min-width:1536px)": {
        fontSize: "0.7rem",
      },
    },
    button: {
      fontSize: "0.9rem",
      fontWeight: 500,
      "@media (min-width:1536px)": {
        fontSize: "1rem",
      },
    },
  },
});

export default theme;
