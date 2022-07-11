import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from "react-redux";
import {persistStore, persistReducer} from "redux-persist";
import { rootPersistConfig, rootReducer } from "./RootReducer";


const Store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: (getDefaultMiddleware)=> 
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
})

const persistor = persistStore(Store)
const {dispatch} = Store
const useSelector = useAppSelector
const useDispatch = () => useAppDispatch()

export {Store, useDispatch, useSelector, persistor, dispatch}