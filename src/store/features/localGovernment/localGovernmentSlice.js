import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import localGovernmentAPI from "./localGovernmentAPIs";
const initialState = {
  data: [],
};

export const getLocalGovernmentsAsync = createAsyncThunk(
  "fetch/lgas",
  async (id) => {
    const response = await localGovernmentAPI.getLocalGovernments(id);
    return response.data.data.lgas;
  }
);

export const localGovermentSlice = createSlice({
  name: "localGovernments",
  initialState,
  reducers: {},
  extraReducers: {
    [getLocalGovernmentsAsync.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const selectLocalGovernments = (state) => state?.lgas?.data;

export default localGovermentSlice.reducer;
