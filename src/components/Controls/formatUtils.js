export function createFullName({ firstName, middleName, lastName }) {
  let name =
    (firstName || "") + " " + (middleName || "") + " " + (lastName || "");
  return name?.trim();
}

export function buildAddress(
  Address1,
  Address2,
  City,
  StateName,
  CountryName,
  zipCode
) {
  let address = null;

  if (Address1) {
    address = Address1;

    if (Address1 && Address2) {
      address = address + ", " + Address2;
    } else if (!Address1 && Address2) {
      address = Address2;
    }
  }

  if (address && City) {
    address = address + ", " + City;
  } else if (!address && City) {
    address = City;
  }

  if (address && StateName && StateName !== "NA") {
    address = address + ", " + StateName;
  } else if (!address && StateName && StateName !== "NA") {
    address = StateName;
  }

  if (address && CountryName && CountryName !== "NA") {
    address = address + ", " + CountryName;
  } else if (!address && CountryName && CountryName !== "NA") {
    address = CountryName;
  }

  if (address && zipCode && zipCode !== "") {
    address = address + ", " + zipCode;
  }

  return address || "-";
}

export function formatText(text) {
  return text
    ?.replace(/(_|-)/g, " ")
    .trim()
    .replace(/\w\S*/g, function (str) {
      return str.charAt(0).toUpperCase() + str.substr(1);
    })
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
}

export function removeSpecialCharacters(data) {
  return data?.replace(/[^a-zA-Z]+/g, "");
}

export function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
