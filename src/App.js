import React, { Suspense } from "react";
import { CssBaseline, CircularProgress, Backdrop } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter } from "react-router-dom";
import CacheBuster from "react-cache-buster";
import * as packageInfo from "../package.json";
import {AuthRouter, Router} from "./routes";
import NavBar from "./components/NavBar";


import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { Store, persistor } from 'src/redux/Store';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const App = () => {
  const classes = useStyles();

  const isProduction = process.env.NODE_ENV === "production";

  let pkgInfo = packageInfo;

  const isAuthenticated = true
  const ChooseRouter = () => {
    return isAuthenticated ? <Router/> : <AuthRouter />
  }

  return (
    <CacheBuster
      currentVersion={pkgInfo.version}
      isEnabled={isProduction} //If false, the library is disabled.
      isVerboseMode={false} //If true, the library writes verbose logs to console.
    >
      <ReduxProvider store={Store} >
      <PersistGate loading={null} persistor={persistor} >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <BrowserRouter>
        <div className={classes.root}>
          <Suspense
            fallback={
              <Backdrop open={true}>
                <CircularProgress color="primary" size={60} />
              </Backdrop>
            }
          >
            {/* <div className={classes.root}> */}
              {/* {auth.isAuthenticated() && <NavBar user={user} />} */}
              {isAuthenticated&&<NavBar user={{ displayName: "Steve" }} />}

              {/* <Toast /> */}
            {/* </div> */}
          </Suspense>
          <Suspense
            fallback={
              <Backdrop open={true}>
                <CircularProgress color="primary" size={60} />
              </Backdrop>
            }
          >
            {/* <div className={classes.root}> */}
              {/* {auth.isAuthenticated() && <NavBar user={user} />} */}
              
              {ChooseRouter()}
              {/* <Toast /> */}
            {/* </div> */}
          </Suspense>
          </div>
        </BrowserRouter>
      </ThemeProvider>
      </PersistGate>
      </ReduxProvider>
    </CacheBuster>
  );
};

export default App;
