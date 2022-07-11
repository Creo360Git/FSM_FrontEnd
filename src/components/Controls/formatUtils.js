import moment from "moment";

export function createFullName({ firstName, middleName, lastName }) {
  let name =
    (firstName || "") + " " + (middleName || "") + " " + (lastName || "");
  return name?.trim();
}

export function buildAddress(
  {
    AddressLine1=null,
    AddressLine2=null,
    City=null,
    State=null,
    Country=null,
    ZipCode=null
  }
) {
  let data = [AddressLine1, AddressLine2, City, State, Country, ZipCode];
  const address = data.filter((value)=> !!value)
  return address.join(', ')
  // if(!!AddressLine1){
  //   address
  // }
  // if (Address1) {
  //   address = Address1;

  //   if (Address1 && Address2) {
  //     address = address + ", " + Address2;
  //   } else if (!Address1 && Address2) {
  //     address = Address2;
  //   }
  // }

  // if (address && City) {
  //   address = address + ", " + City;
  // } else if (!address && City) {
  //   address = City;
  // }

  // if (address && StateName && StateName !== "NA") {
  //   address = address + ", " + StateName;
  // } else if (!address && StateName && StateName !== "NA") {
  //   address = StateName;
  // }

  // if (address && CountryName && CountryName !== "NA") {
  //   address = address + ", " + CountryName;
  // } else if (!address && CountryName && CountryName !== "NA") {
  //   address = CountryName;
  // }

  // if (address && zipCode && zipCode !== "") {
  //   address = address + ", " + zipCode;
  // }

  // return address || "-";
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

export function fDate(date) {
  return moment(date).format('DD MMMM yyyy')
}

export function fDateShort(date) {
  return moment(date).format('yyyy-MM-DD')
}

export function fTimeShort(time) {
  return moment(time).format('HH:mm')
}

export function fDateShortTime(dateTime) {
  return moment(dateTime).format('yyyy-MM-DD HH:mm a')
}

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

export function fTimeDifference(startTime,endTime){
  const start =moment(startTime ).format( "YYYY-MM-DD HH:mm");
  const end = moment(moment(endTime ).format( "YYYY-MM-DD HH:mm")); 
  const diff = end.diff(start);

  return moment.utc(diff).format("HH:mm");
}

export function fTimeValidate(value){
  return moment(moment(value).format('HH:mm'),'HH:mm',true).isValid()
}

export function fTimeDifferenceDate(startTime,endTime){

  const value = fTimeDifference(startTime,endTime)
  const init = moment(startTime).format("YYYY-MM-DD")
  
  return moment(moment(init).add(moment.duration(value)))

}

export function fTimeAdd(startTime,time){
  const start =  moment(time).format('YYYY-MM-DD')
  const diff  = fTimeDifference(start,time)
  return moment(moment(startTime).add(moment.duration(diff)))
}