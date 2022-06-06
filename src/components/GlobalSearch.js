import React, {
  useEffect,
  useState,
  //  useContext
} from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
// import { useNavigate } from "react-router";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
// import { AuthContext } from "../auth/AuthProvider";
// import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  iconButtonRoot: {
    backgroundColor: "inherit !important",
    color: theme.palette.primary.main,
    padding: 0,
  },
}));

const GlobalSearch = () => {
  const classes = useStyles();
  const theme = useTheme();
  //   const auth = useContext(AuthContext);
  //   const history = useNavigate();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({
    customers: [],
    vehicles: [],
    reservations: [],
    agreements: [],
  });
  const [selectedValue, setSelectedValue] = useState(null);
  //   const { t } = useTranslation();

  useEffect(() => {
    if (
      results.customers.length > 0 ||
      results.vehicles.length > 0 ||
      results.reservations.length > 0 ||
      results.agreements.length > 0
    ) {
      setLoading(false);
    }
  }, [results]);

  const onChange = async (event) => {
    if (event.target.value.length >= 1) {
      //   let profile = auth.getProfile();

      try {
        // let customers = await api.getCustomers(
        //   {
        //     Keyword: event.target.value,
        //     ClientId: profile.clientId,
        //   },
        //   auth.getToken()
        // );
        // setResults((results) => {
        //   return {
        //     ...results,
        //     customers: customers.list.map((c) => {
        //       return {
        //         id: c.CustomerId,
        //         label: `${c.FirstName} ${c.LastName}`,
        //         type: "customer",
        //       };
        //     }),
        //   };
        // });
      } catch {
        setResults((results) => {
          return {
            ...results,
            customers: [],
          };
        });
      }

      try {
        // let vehicles = await api.getVehicles(
        //   {
        //     LicenseNo: event.target.value,
        //     ClientId: profile.clientId,
        //   },
        //   auth.getToken()
        // );
        // setResults((results) => {
        //   return {
        //     ...results,
        //     vehicles: vehicles.list.map((c) => {
        //       return {
        //         id: c.VehicleId,
        //         label: `${c.Year} ${c.VehicleMakeName} ${c.ModelName}`,
        //         type: "vehicle",
        //       };
        //     }),
        //   };
        // });
      } catch {
        setResults((results) => {
          return {
            ...results,
            vehicles: [],
          };
        });
      }

      try {
        // let reservations = await api.getReservations(
        //   {
        //     ReservationNumber: event.target.value,
        //     ClientId: profile.clientId,
        //     UserId: profile.userId,
        //   },
        //   auth.getToken()
        // );
        // setResults((results) => {
        //   return {
        //     ...results,
        //     reservations: reservations.list.map((c) => {
        //       return {
        //         id: c.ReserveId,
        //         label: `${c.ReservationNumber} - ${c.FirstName} ${c.LastName} - ${c.VehicleNo}`,
        //         type: "reservation",
        //       };
        //     }),
        //   };
        // });
      } catch {
        setResults((results) => {
          return {
            ...results,
            reservations: [],
          };
        });
      }

      try {
        // let agreements = await api.getAgreements(
        //   {
        //     AgreementNumber: event.target.value,
        //     ClientId: profile.clientId,
        //     UserId: profile.userId,
        //   },
        //   auth.getToken()
        // );
        // setResults((results) => {
        //   return {
        //     ...results,
        //     agreements: agreements.list.map((c) => {
        //       return {
        //         id: c.AgreementId,
        //         label: `${c.AgreementNumber} - ${c.FirstName} ${c.LastName}`,
        //         type: "agreement",
        //       };
        //     }),
        //   };
        // });
      } catch {
        setResults((results) => {
          return {
            ...results,
            agreements: [],
          };
        });
      }
    }
  };

  const handleItemClick = (value) => {
    setSelectedValue(value);

    setResults({
      customers: [],
      vehicles: [],
      reservations: [],
      agreements: [],
    });

    if (value) {
      //   const encodedId = Buffer.from(String(value.id)).toString("base64");
      //   if (value.type === "customer") {
      //     history.push({
      //       pathname: `/CustomerDetails/${encodedId}`,
      //       customerId: encodedId,
      //     });
      //   } else if (value.type === "vehicle") {
      //     history.push({
      //       pathname: `/VehicleDetails/${encodedId}`,
      //       vehicleId: encodedId,
      //     });
      //   } else if (value.type === "reservation") {
      //     history.push({
      //       pathname: `/ReservationDetails/${encodedId}`,
      //       reservationId: encodedId,
      //     });
      //   } else if (value.type === "agreement") {
      //     history.push({
      //       pathname: `/AgreementDetails/${encodedId}`,
      //       agreementId: encodedId,
      //     });
      //   }
    }
  };

  const options = [
    ...results.customers,
    ...results.vehicles,
    ...results.agreements,
    ...results.reservations,
  ];

  return (
    <Autocomplete
      freeSolo
      style={{ width: "100%" }}
      filterOptions={(x) => x}
      options={options}
      loading={loading}
      getOptionLabel={(option) => option.label}
      onInputChange={onChange}
      onChange={(e, value) => handleItemClick(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          color="primary"
          //   label={t("labels.searchForAnything")}
          placeholder="Search For Anything"
          size="small"
          style={{ width: "100%" }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <React.Fragment>
                <InputAdornment position="end">
                  <IconButton
                    aria-label="search"
                    onClick={(e) => handleItemClick(selectedValue)}
                    className={classes.iconButtonRoot}
                  >
                    <SearchIcon
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    />
                  </IconButton>
                </InputAdornment>
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default GlobalSearch;
