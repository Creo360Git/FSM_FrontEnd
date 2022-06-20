import React, {
  useState,
  // useEffect, useContext
} from "react";
import {
  Grid,
  Button,
  useTheme,
  TextField,
  Typography,
  Fab,
  Container,
  Stack,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectClientDialog from "../Common/SelectClientDialog";
import { DropzoneArea } from "react-mui-dropzone";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddProduct from "../Quote/AddProduct";
import { Box } from "@mui/system";
import MoreOptionsMenu from "../Controls/MoreOptionsMenu";

const InvoiceForm = () => {
  const theme = useTheme();

  const matchSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { t } = useTranslation();

  const schema = yup.object().shape({
    quoteTitle: yup.string().required(t("messages.required")),
    clientMessage: yup.string(),
    noteDetails: yup.string(),
    document: yup.string(),
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

  const initProduct = {
    serviceId: 0,
    description: "",
    qty: 0,
    unitPrice: 0,
    total: 0,
    imgUrl: "",
  };

  const [values, setValues] = useState({
    quoteTitle: "",
    clientMessage: "",
    noteDetails: "",
    document: "",
    product: [initProduct],
  });

  const onSubmit = async (data) => {
    setValues((values) => ({
      ...values,
      quoteTitle: "",
      clientMessage: "",
      noteDetails: "",
      document: "",
      product: [initProduct],
    }));
  };

  const onChangeValueData = (e) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddProduct = (values) => {
    const products = [...values.product, initProduct];

    setValues((values) => ({
      ...values,
      product: products,
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

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuItems = [
    {
      label: (
        <Typography color="primary" variant="h4">
          {t("buttons.sendAsEmail")}
        </Typography>
      ),
      //   onClick: handleClickOpen,
      color: theme.palette.primary.main,
    },
    {
      label: (
        <Typography color="primary" variant="h4">
          {t("buttons.convertToJob")}
        </Typography>
      ),
      //   onClick: handleClickOpen,
      color: theme.palette.primary.main,
    },
    {
      label: (
        <Typography color="primary" variant="h4">
          {t("buttons.clientNotResponded")}
        </Typography>
      ),
      //   onClick: handleClickOpen,
      color: theme.palette.primary.main,
    },
  ];

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
          <Grid container item spacing={3} alignItems="center" justify="center">
            <Grid item xs={12}>
              <Typography
                variant="h2"
                sx={{ fontWeight: theme.typography.fontWeightBold }}
              >
                Invoice for SND pvt
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

            <Grid
              item
              xs={12}
              style={{
                marginTop: theme.spacing(1),
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: theme.typography.fontWeightBold }}
              >
                {t("headings.quoteTitle")}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                name="quoteTitle"
                label={t("labels.quoteTitle")}
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

            <Grid
              item
              xs={12}
              style={{
                marginTop: theme.spacing(1),
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: theme.typography.fontWeightBold }}
                gutterBottom
              >
                {t("headings.productService")}
              </Typography>

              <Divider />
            </Grid>

            {values.product?.map((x, i) => {
              return (
                <Grid item xs={12} key={i}>
                  <AddProduct
                    serviceList={[]}
                    index={i}
                    values={values}
                    setValues={setValues}
                    productItem={x}
                  />
                </Grid>
              );
            })}

            <Grid
              item
              xs={12}
              style={{
                marginTop: theme.spacing(1),
              }}
            >
              <Divider />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                name="clientMessage"
                label={t("labels.clientMessage")}
                fullWidth
                type="text"
                variant="outlined"
                size="small"
                rows={6}
                multiline
                value={values?.clientMessage || ""}
                onChange={onChangeValueData}
                {...register("clientMessage")}
                error={!!errors.clientMessage}
                helperText={errors.clientMessage?.message}
              />
            </Grid>

            <Grid container spacing={1} item sm={6} xs={12}>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: theme.typography.fontWeightBold,
                    color: "#808080",
                  }}
                >
                  {t("labels.subtotal")}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="flex-start"
                  justifyContent="flex-end"
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: theme.typography.fontWeightBold }}
                  >
                    $0.00
                  </Typography>
                </Box>
              </Grid>

              <Divider sx={{ width: "100%" }} />

              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: theme.typography.fontWeightBold,
                    color: "#808080",
                  }}
                >
                  {t("labels.discount")}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="flex-start"
                  justifyContent="flex-end"
                >
                  <TextField
                    name="discount"
                    label=""
                    type="number"
                    variant="outlined"
                    size="small"
                    sx={{ width: "40%" }}
                    // value={values?.noteDetails || ""}
                    // onChange={onChangeValueData}
                  />
                </Box>
              </Grid>

              <Divider sx={{ width: "100%" }} />

              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: theme.typography.fontWeightBold,
                    color: "#808080",
                  }}
                >
                  {t("labels.tax")}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="flex-start"
                  justifyContent="flex-end"
                >
                  <TextField
                    name="tax"
                    label=""
                    type="number"
                    variant="outlined"
                    size="small"
                    sx={{ width: "40%" }}
                    // value={values?.noteDetails || ""}
                    // onChange={onChangeValueData}
                  />
                </Box>
              </Grid>

              <Divider sx={{ width: "100%" }} />

              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: theme.typography.fontWeightBold,
                  }}
                >
                  {t("labels.total")}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="flex-start"
                  justifyContent="flex-end"
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: theme.typography.fontWeightBold }}
                  >
                    $0.00
                  </Typography>
                </Box>
              </Grid>

              <Divider sx={{ width: "100%", height: "0.2rem" }} />

              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: theme.typography.fontWeightBold,
                    color: "#808080",
                  }}
                >
                  {t("labels.deposite")}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="flex-start"
                  justifyContent="flex-end"
                >
                  <TextField
                    name="deposite"
                    label=""
                    type="number"
                    variant="outlined"
                    size="small"
                    sx={{ width: "40%" }}
                    // value={values?.noteDetails || ""}
                    // onChange={onChangeValueData}
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                marginTop: theme.spacing(1),
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: theme.typography.fontWeightBold }}
              >
                {t("headings.notesAttachments")}
              </Typography>

              <Divider />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="noteDetails"
                label={t("labels.noteDetails")}
                fullWidth
                type="text"
                variant="outlined"
                size="small"
                rows={6}
                multiline
                value={values?.noteDetails || ""}
                onChange={onChangeValueData}
                {...register("noteDetails")}
                error={!!errors.noteDetails}
                helperText={errors.noteDetails?.message}
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                marginTop: theme.spacing(1),
              }}
            >
              <DropzoneArea
                filesLimit={1}
                acceptedFiles={[
                  "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf",
                ]}
                maxFileSize={5000000}
                dropzoneText={t("labels.dropZoneLabel")}
                onChange={(file) => setDocument(file)}
                getPreviewIcon={handlePreviewIcon}
              />
            </Grid>

            {!matchSmDown && (
              <Grid sm={6} xs={12} item>
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  justifyContent="flex-start"
                  spacing={2}
                >
                  <Button variant="outlined">{t("buttons.cancel")}</Button>
                </Stack>
              </Grid>
            )}

            <Grid sm={6} xs={12} item>
              <Stack
                direction="row"
                alignItems="flex-end"
                justifyContent={matchSmDown ? "space-between" : "flex-end"}
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
                  onClick={(e) => {
                    openMenu(e);
                  }}
                >
                  {t("buttons.saveAnd")}
                </Button>

                {MoreOptionsMenu(menuItems, anchorEl, setAnchorEl)}
              </Stack>
            </Grid>

            {matchSmDown && (
              <Grid sm={6} xs={12} item>
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                  spacing={2}
                >
                  <Button variant="outlined">{t("buttons.cancel")}</Button>
                </Stack>
              </Grid>
            )}
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

export default InvoiceForm;
