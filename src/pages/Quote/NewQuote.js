import React, {
  useState,
  // useEffect, useContext
} from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, useTheme, IconButton, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";
import QuoteForm from "../../components/Quote/QuoteForm";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  buttonGridItem: {
    margin: theme.spacing(1),
    textAlign: "center",
  },
  buttonShadow: {
    borderRadius: "2px",
    boxShadow:
      "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",

    "&:hover": {
      boxShadow:
        "0px 3px 1px -1px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    },
  },
  buttonSmall: {
    padding: theme.spacing(1),
    borderRadius: "5px",
    backgroundColor: theme.palette.background.button,
  },

  links: {
    textDecoration: "none",
  },
}));

const NewQuote = () => {
  const classes = useStyles();

  const theme = useTheme();

  const { t } = useTranslation();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container spacing={3}>
        <Grid item container lg={6} xs={12}>
          <Grid container alignItems="center">
            <Grid item md={1} xs={3}>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid
                  item
                  className={`${classes.buttonGridItem} ${classes.buttonShadow}`}
                >
                  <IconButton
                    color="primary"
                    className={`${classes.buttonSmall} ${classes.links}`}
                    component={Link}
                    to={"/quotes"}
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>
                </Grid>
              </Box>
            </Grid>
            <Grid item lg={4} md={4} xs={9} container>
              <Typography
                variant="h2"
                align="left"
                display="inline"
                color="primary"
                style={{
                  wordWrap: "break-word",
                  width: 240,
                }}
              >
                {"New Quote"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <QuoteForm />
    </main>
  );
};

export default NewQuote;
