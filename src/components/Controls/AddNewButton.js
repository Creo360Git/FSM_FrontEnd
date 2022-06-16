import { Stack, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddNewButton = (props) => {
  const theme = useTheme();
  const {
    title = "Add New",
    redirectPath = "#",
    handleClick,
    icon = <AddCircleIcon />,
    ...rest
  } = props;
  return (
    <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={2}>
      <Button
        variant="contained"
        component={Link}
        to={redirectPath}
        sx={{ textDecoration: "none" }}
        onClick={handleClick}
        startIcon={icon}
        {...rest}
      >
        <Typography
          variant="h3"
          sx={{
            textTransform: "uppercase",
            fontWeight: theme.typography.fontWeightRegular,
          }}
        >
          {title}
        </Typography>
      </Button>
    </Stack>
  );
};
export default AddNewButton;
