import { combineReducers } from "@reduxjs/toolkit";
import localGovermentSlice from "./features/localGovernment/localGovernmentSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import pollingUnitSlice from "./features/pollingUnit/pollingUnitSlice";
import transcribeSlice from "./features/transcribe/transcribeSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["profile"],
};

const rootReducers = combineReducers({
  lgas: localGovermentSlice,
  pollingUnits: pollingUnitSlice,
  transcribe: transcribeSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export default persistedReducer;
