import React, {
  useState,
  // useEffect, useContext
} from "react";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Button,
  useTheme,
  TextField,
  Box,
  Typography,
  Fab,
  Container,
  Stack,
  ButtonGroup,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectClientDialog from "../Common/SelectClientDialog";
import AddIcon from "@mui/icons-material/Add";
import { DropzoneArea } from "react-mui-dropzone";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

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

  const schema = yup.object().shape({
    quoteTitle: yup.string().required(t("messages.required")),
    // oldPassword: yup.string().required(t("messages.required")),
    // newPassword: yup
    //   .string()
    //   .min(8, t("messages.minPasswordCharacters"))
    //   .max(15, t("messages.maxPasswordCharacters"))
    //   .required(t("messages.required")),
    // confirmPassword: yup
    //   .string()
    //   .oneOf(
    //     [yup.ref("newPassword"), null],
    //     t("messages.confirmPwMustMatchToNewPw")
    //   )
    //   .required(t("messages.required")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [values, setValues] = useState({
    quoteTitle: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const onSubmit = async (data) => {
    setValues((values) => ({
      ...values,
      quoteTitle: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  const onChangeValueData = (e) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const [show, setShow] = useState(false);

  const [client, setClient] = useState();

  const handleOpen = () => {
    setShow(true);
  };

  const [document, setDocument] = useState([]);

  const handlePreviewIcon = (fileObject, classes) => {
    const iconProps = {
      className: classes.image,
    };

    return <InsertDriveFileIcon {...iconProps} fontSize="large" />;
  };

  return (
    <Grid
      container
      spacing={3}
      style={{
        marginTop: theme.spacing(2),
      }}
    >
      <Container>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          style={{ width: "100%" }}
        >
          <Grid container item spacing={2} alignItems="center" justify="center">
            {!!client ? (
              <>
                <Grid item xs={12}>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: theme.typography.fontWeightBold }}
                  >
                    {client?.name}
                  </Typography>
                </Grid>
                <Grid md={3} sm={5} xs={6} item>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: theme.typography.fontWeightBold }}
                  >
                    Property adress
                  </Typography>
                  <Grid container item>
                    <Grid item xs={12}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#818EA1",
                          fontWeight: theme.typography.fontWeightRegular,
                        }}
                      >
                        135/B Garden State Ave , Mississauga,Ontario,L4T 0A5,{" "}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid xs="auto" item>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: theme.typography.fontWeightBold }}
                  >
                    Contact details
                  </Typography>
                  <Grid container item>
                    <Grid item xs={12}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#818EA1",
                          fontWeight: theme.typography.fontWeightRegular,
                        }}
                      >
                        0777898734
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#818EA1",
                          fontWeight: theme.typography.fontWeightRegular,
                        }}
                      >
                        snd89@gmail.com
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ) : (
              <Grid xs={12} item>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: theme.typography.fontWeightBold }}
                >
                  Client Name
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    sx={{ ml: 2 }}
                    onClick={handleOpen}
                  >
                    <AddIcon />
                  </Fab>
                </Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Typography
                variant="h4"
                sx={{ fontWeight: theme.typography.fontWeightBold }}
              >
                Quote Title
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                name="quoteTitle"
                label={"Quote Title"}
                fullWidth
                type="text"
                variant="outlined"
                size="small"
                value={values?.quoteTitle || ""}
                onChange={onChangeValueData}
                {...register("quoteTitle")}
                error={!!errors.quoteTitle}
                helperText={errors.quoteTitle?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="h4"
                sx={{ fontWeight: theme.typography.fontWeightBold }}
              >
                Notes & Attachments
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="noteDetails"
                label={"Note details"}
                fullWidth
                type="text"
                variant="outlined"
                size="small"
                rows={4}
                multiline
                value={values?.noteDetails || ""}
                onChange={onChangeValueData}
                {...register("noteDetails")}
                error={!!errors.noteDetails}
                helperText={errors.noteDetails?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <DropzoneArea
                filesLimit={1}
                acceptedFiles={[
                  "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf",
                ]}
                maxFileSize={5000000}
                dropzoneText={t("labels.dropZoneLabel")}
                onChange={(image) => setDocument(image)}
                getPreviewIcon={handlePreviewIcon}
              />
            </Grid>

            <Grid xs={6} item>
              <Stack
                direction="row"
                alignItems="flex-end"
                justifyContent="flex-start"
                spacing={2}
              >
                <Button variant="outlined">CANCEL</Button>
              </Stack>
            </Grid>

            <Grid xs={6} item>
              <Stack
                direction="row"
                alignItems="flex-end"
                justifyContent="flex-end"
                spacing={2}
              >
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{ textTransform: "uppercase" }}
                >
                  {t("buttons.save")}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: "uppercase" }}
                >
                  Save And ...
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Container>

      <SelectClientDialog
        show={show}
        setShow={setShow}
        theme={theme}
        setClient={setClient}
      />
    </Grid>
  );
};

export default NewQuote;
