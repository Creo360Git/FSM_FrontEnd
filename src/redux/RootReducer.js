import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import clientReducer from "./Slices/Client";
import typeReducer from "./Slices/Type"
import jobReducer from './Slices/Job'
import invoiceReducer from './Slices/Invoice'
import requestReducer from './Slices/Request'
import QuoteReducer from './Slices/Quote'
import commonReducer from './Slices/Common'


const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
};

const rootReducer = combineReducers({
    client: clientReducer,
    type: typeReducer,
    job: jobReducer,
    invoice: invoiceReducer,
    request: requestReducer,
    quote: QuoteReducer,
    common: commonReducer
});
  
export { rootPersistConfig, rootReducer };