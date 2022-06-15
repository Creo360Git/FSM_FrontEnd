import { useState, useEffect } from "react";
import { Toolbar, Grid, MenuItem, TextField, alpha } from "@mui/material";

const CustomToolbar = (props) => {
  const { toolBar, setRows, rows } = props;
  const [values, setValues] = useState({});
  useEffect(() => {
    const obj = toolBar.reduce((accumulator, value) => {
      return { ...accumulator, [value.field]: "" };
    }, {});
    setValues(obj);
  }, [toolBar]);

  const handleChange = (e) => {
    setValues(({ ...values }) => {
      values[e.target.name] = e.target.value;
      return values;
    });
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        bgcolor: (theme) =>
          alpha(
            theme.palette.primary.main,
            theme.palette.action.activatedOpacity
          ),
      }}
    >
      <Grid container spacing={2}>
        {toolBar.map((val, index) => {
          return (
            <Grid
              item
              lg={12 / toolBar.length}
              xs={toolBar.length > 3 ? 4 : 12 / toolBar.length}
              sx={{ mt: { lg: 2, md: 1, xs: 1 }, mb: { lg: 2, md: 1, xs: 1 } }}
              key={index}
            >
              <TextField
                fullWidth
                id="outlined-select-currency"
                select={val.type === "select"}
                label={val.placeholder}
                name={val.field}
                value={values[val.field] || ""}
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                {val.type === "select" &&
                  val.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
          );
        })}
      </Grid>
    </Toolbar>
  );
};
export default CustomToolbar;
