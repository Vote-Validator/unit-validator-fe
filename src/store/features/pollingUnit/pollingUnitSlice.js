import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pollingUnitAPI from "./pollingUnitAPIs";
const initialState = {
  data: [],
};

export const pollingUnitsAsync = createAsyncThunk(
  "fetch/pollingUnits",
  async (id) => {
    const response = await pollingUnitAPI.getPollingUnits(id);
    return response.data.data.lgas;
  }
);

export const pollingUnitSlice = createSlice({
  name: "pollingUnits",
  initialState,
  reducers: {},
  extraReducers: {
    [pollingUnitsAsync.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const selectPollingUnits = (state) => state?.pollingUnits?.data;

export default pollingUnitSlice.reducer;
