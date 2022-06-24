import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Button,
  Box,
  TextField,
  Typography,
  Autocomplete,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import { DropzoneDialog } from "react-mui-dropzone";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

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

const AddProduct = (props) => {
  const { serviceList, index, values, setValues, productItem } = props;

  const classes = useStyles();

  const theme = useTheme();

  const { t } = useTranslation();

  const matchSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e, index) => {
    let newArray = [...values?.product];

    newArray[index] = e;

    setValues((values) => ({
      ...values,
      product: newArray,
    }));
  };

  const handleRemoveClick = () => {
    let newArray = [...values?.product];
    newArray.splice(index, 1);

    setValues((values) => ({
      ...values,
      product: newArray,
    }));
  };

  const [openImage, setOpenImage] = useState(false);

  return (
    <Grid container item xs={12} spacing={3}>
      <Grid item sm={4} xs={12}>
        <Autocomplete
          onChange={(e, newValue) => {
            productItem.serviceId = e.target.value;
            handleChange(productItem, index);
          }}
          size="small"
          options={serviceList}
          getOptionLabel={(option) => option?.serviceName || ""}
          value={productItem?.serviceId || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              name={`productItem.${index}.serviceId`}
              label={t("labels.serviceName")}
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Grid>

      <Grid item sm={2} xs={12}>
        <TextField
          name={`productItem.${index}.qty`}
          label={t("labels.serviceName")}
          fullWidth
          type="number"
          variant="outlined"
          size="small"
          value={productItem?.qty || ""}
          onChange={(e) => {
            productItem.qty = e.target.value;
            handleChange(productItem, index);
          }}
        />
      </Grid>

      <Grid item sm={3} xs={12}>
        <TextField
          name={`productItem.${index}.unitPrice`}
          label={t("labels.unitPrice")}
          fullWidth
          type="number"
          variant="outlined"
          size="small"
          value={productItem?.unitPrice || ""}
          onChange={(e) => {
            productItem.unitPrice = e.target.value;
            handleChange(productItem, index);
          }}
        />
      </Grid>

      <Grid item sm={3} xs={12}>
        <TextField
          name={`productItem.${index}.total`}
          label={t("labels.total")}
          fullWidth
          type="number"
          variant="outlined"
          size="small"
          value={productItem?.total || ""}
          onChange={(e) => {
            productItem.total = e.target.value;
            handleChange(productItem, index);
          }}
        />
      </Grid>

      <Grid item sm={4} xs={12}>
        <TextField
          name={`productItem.${index}.description`}
          label={t("labels.description")}
          fullWidth
          type="text"
          rows={4}
          multiline
          variant="outlined"
          size="small"
          value={productItem?.description || ""}
          onChange={(e) => {
            productItem.description = e.target.value;
            handleChange(productItem, index);
          }}
        />
      </Grid>

      <Grid item sm={2} xs={12}>
        <Box ml={1}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenImage(true)}
            startIcon={<AddCircleIcon />}
            size="small"
            fullWidth
            sx={{ textTransform: "uppercase" }}
          >
            <Typography variant="h4">{t("labels.image")}</Typography>
          </Button>

          <DropzoneDialog
            acceptedFiles={["image/*"]}
            cancelButtonText={t("buttons.cancel")}
            submitButtonText={t("buttons.submit")}
            filesLimit={1}
            maxFileSize={5000000}
            open={openImage}
            onClose={() => setOpenImage(false)}
            onSave={(image) => {
              productItem.imgUrl = image;
              handleChange(productItem, index);
              setOpenImage(false);
            }}
            showPreviews={false}
            showPreviewsInDropzone={true}
          />
        </Box>
      </Grid>

      {index > 0 && (
        <Grid item sm={6} xs={12}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="flex-end"
            justifyContent={matchSmDown ? "center" : "flex-end"}
          >
            <IconButton
              className={classes.deleteBtn}
              onClick={handleRemoveClick}
            >
              <DeleteIcon className={classes.deleteIcon} />
            </IconButton>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
export default AddProduct;
