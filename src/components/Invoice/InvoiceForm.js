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
  IconButton,
  Container,
  Stack,
  useMediaQuery,
  Divider,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DropzoneArea } from "react-mui-dropzone";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddProduct from "../Quote/AddProduct";
import { Box } from "@mui/system";
import MoreOptionsMenu from "../Controls/MoreOptionsMenu";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const useStyles = makeStyles((theme) => ({
  deleteBtn: {
    background: "#f8e8eb",
    "&:hover": {
      background: "#f8e8eb",
    },
  },
  deleteIcon: {
    color: theme.palette.common.danger,
  },
}));

const InvoiceForm = () => {
  const theme = useTheme();

  const classes = useStyles();

  const matchSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { t } = useTranslation();

  const schema = yup.object().shape({
    subject: yup.string().required(t("messages.required")),
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
    subject: "",
    clientMessage: "",
    noteDetails: "",
    document: "",
    issueDate: "",
    paymentDue: "",
    product: [initProduct],
  });

  const onSubmit = async (data) => {
    setValues((values) => ({
      ...values,
      subject: "",
      clientMessage: "",
      noteDetails: "",
      document: "",
      issueDate: "",
      paymentDue: "",
      product: [initProduct],
    }));
  };

  const onChangeValueData = (e) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
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

  const paymentDueList = [
    { label: "Upon Receipt", value: "uponReceipt" },
    { label: "Net 15", value: "net15" },
    { label: "Net 30", value: "net30" },
    { label: "Net 45", value: "net45" },
    { label: "Customize", value: "customize" },
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
                {t("headings.invoiceSubject")}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                name="subject"
                label={t("labels.invoiceSubject")}
                fullWidth
                type="text"
                variant="outlined"
                size="small"
                value={values?.subject || ""}
                onChange={onChangeValueData}
                {...register("subject")}
                error={!!errors.subject}
                helperText={errors.subject?.message}
              />
            </Grid>

            <Grid md={3} sm={4} xs={12} item>
              <Typography
                variant="h5"
                sx={{ fontWeight: theme.typography.fontWeightBold }}
              >
                Billing Adress
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

            <Grid md={3} sm={4} xs={12} item>
              <Typography
                variant="h5"
                sx={{ fontWeight: theme.typography.fontWeightBold }}
              >
                Service Adress
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
                    Service adress (Same as billing address)
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid md={3} sm={4} xs={12} item>
              <Typography
                variant="h5"
                sx={{ fontWeight: theme.typography.fontWeightBold }}
              >
                Contact Details
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
                gutterBottom
              >
                {t("headings.invoiceDetails")}
              </Typography>

              <Divider />
            </Grid>

            <Grid container spacing={1} item xs={12}>
              <Grid item md={2} sm={3} xs={5}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: theme.typography.fontWeightRegular,
                    paddingTop: "0.5rem",
                  }}
                >
                  {t("labels.issuedDate")}
                </Typography>
              </Grid>

              <Grid item md={3} sm={6} xs={7}>
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  justifyContent={"space-between"}
                  spacing={2}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label=""
                      name="issueDate"
                      value={values?.issueDate || moment().format("MM-DD-YYYY")}
                      onChange={(newValue) => {
                        setValues((values) => ({
                          ...values,
                          issueDate: newValue,
                        }));
                      }}
                      renderInput={(params) => (
                        <TextField {...params} size="small" />
                      )}
                    />
                  </LocalizationProvider>

                  <IconButton
                    className={classes.deleteBtn}
                    // onClick={handleRemoveClick}
                  >
                    <DeleteIcon className={classes.deleteIcon} />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>

            <Grid container spacing={1} item xs={12}>
              <Grid item md={2} sm={3} xs={5}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: theme.typography.fontWeightRegular,
                    paddingTop: "0.5rem",
                  }}
                >
                  {t("labels.paymentDue")}
                </Typography>
              </Grid>

              <Grid item md={3} sm={6} xs={7}>
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  justifyContent={"space-between"}
                  spacing={2}
                >
                  <FormControl fullWidth>
                    <Select
                      name="paymentDue"
                      label=""
                      value={values?.paymentDue || ""}
                      onChange={onChangeValueData}
                      size="small"
                    >
                      {paymentDueList?.map((item, index) => {
                        return (
                          <MenuItem value={item?.value} key={index}>
                            {item?.label || ""}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>

                  <IconButton
                    className={classes.deleteBtn}
                    // onClick={handleRemoveClick}
                  >
                    <DeleteIcon className={classes.deleteIcon} />
                  </IconButton>
                </Stack>
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
    </Grid>
  );
};

export default InvoiceForm;
