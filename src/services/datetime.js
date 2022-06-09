import moment from "moment";
// import store from "../redux/configureStore";

export const formatDate = (date) => {
  // let user = store.getState().user;

  return moment(date).format("YYYY-MM-DD");

  // if (user.overrideDateFormat != null) {
  //   return moment(date).format(user.overrideDateFormat);
  // } else {
  //   return null;
  // }
};

export const formatTime = (time, isStandardUnit) => {
  // let user = store.getState().user;
  // if (isStandardUnit) {
  //   return moment(time, user?.overrideTimeFormat || "LT").format("HH:mm");
  // } else if (user.overrideTimeFormat != null) {
  //   return moment(time).format(user.overrideTimeFormat);
  // } else {
  //   return null;
  // }

  if (isStandardUnit) {
    return moment(time, "LT").format("HH:mm");
  } else {
    return moment(time).format("HH:mm");
  }
};
