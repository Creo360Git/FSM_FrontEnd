import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import clientReducer from "./Slices/Client";
import typeReducer from "./Slices/Type"
import jobReducer from './Slices/Job'
import invoiceReducer from './Slices/Invoice'


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
    invoice: invoiceReducer
});
  
export { rootPersistConfig, rootReducer };