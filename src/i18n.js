import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en-US",
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      // format: function (value, format, lng) {

      //     console.log("interpolation", {value, format, lng})

      //     if (!isNaN(value) && format) {
      //         return new Intl.NumberFormat(lng, {
      //             style: "currency",
      //             currency: format,
      //         }).format(value);
      //     }
      //     const dateFormat = "YYYY-MM-DDTHH:mm:ss";
      //     const toDateFormat = moment(new Date(value)).format(dateFormat);

      //     if (moment(toDateFormat, dateFormat, true).isValid()) {
      //         console.log("dateValue", moment(value).format(format));
      //         return moment(value).format(format);
      //     }

      //     return value;
      // },
    },
  });

export default i18n;
