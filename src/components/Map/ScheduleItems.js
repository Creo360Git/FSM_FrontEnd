import React, { useState, useEffect } from "react";
import {
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";

const EmployeeList = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const [schItems, setSchItems] = useState([
    { name: "job1", job: "CCTV Repiar" },
    { name: "job2", job: "Monitor Repair" },
    { name: "job3", job: "Laptop Repair" },
    { name: "job4", job: "Light Repair" },
  ]);

  const [filterSchItems, setFilterSchItems] = useState(schItems);

  useEffect(() => {
    if (!!searchQuery) {
      setFilterSchItems(
        schItems.filter(
          (emp) =>
            emp.name.toLowerCase().match(searchQuery.toLowerCase()) ||
            emp.job.toLowerCase().match(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery]);

  return (
    <>
      <Typography variant="h3" align="left" sx={{ ml: 1, mr: 1, mt: 4, mb: 4 }}>
        {t("labels.scheduledItems")}
      </Typography>

      <TextField
        name="search"
        placeholder="Search..."
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        sx={{ boxShadow: 1, ml: 1, mr: 1 }}
      />
      <List sx={{ bgcolor: "background.paper", m: 1 }}>
        {(!!searchQuery ? filterSchItems : schItems).map((emp, index) => {
          return (
            <ListItem
              key={index}
              sx={{
                boxShadow: 1,
                mb: 0.5,
                borderRadius: 1,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: theme.palette.background.button,
                },
              }}
            >
              <ListItemText
                primary={emp?.name}
                secondary={
                  <Chip label={emp?.job} component="span" size="small" />
                }
              />
            </ListItem>
          );
        })}
        {filterSchItems.length == 0 && !!searchQuery && (
          <Typography
            component="span"
            ml={1}
            sx={{ fontWeight: theme.typography.fontWeightBold }}
          >
            No data
          </Typography>
        )}
      </List>
    </>
  );
};
export default EmployeeList;
