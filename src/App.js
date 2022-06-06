import React, { Suspense } from "react";
import { CssBaseline, CircularProgress, Backdrop } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter } from "react-router-dom";
import CacheBuster from "react-cache-buster";
import * as packageInfo from "../package.json";
import Router from "./routes";
import NavBar from "./components/NavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const App = () => {
  const classes = useStyles();

  const isProduction = process.env.NODE_ENV === "production";

  let pkgInfo = packageInfo;
  return (
    <CacheBuster
      currentVersion={pkgInfo.version}
      isEnabled={isProduction} //If false, the library is disabled.
      isVerboseMode={false} //If true, the library writes verbose logs to console.
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <BrowserRouter>
          <Suspense
            fallback={
              <Backdrop open={true}>
                <CircularProgress color="primary" size={60} />
              </Backdrop>
            }
          >
            <div className={classes.root}>
              {/* {auth.isAuthenticated() && <NavBar user={user} />} */}
              <NavBar user={{ displayName: "Steve" }} />
              <Router />
              {/* <Toast /> */}
            </div>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </CacheBuster>
  );
};

export default App;
