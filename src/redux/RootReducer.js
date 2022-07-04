import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import clientReducer from "./Slices/Client";


const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
};

const rootReducer = combineReducers({
    client: clientReducer
});
  
export { rootPersistConfig, rootReducer };