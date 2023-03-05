import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transcribeAPI from "./transcribeAPI";

const initialState = {
  data: [],
};

export const storeTranscribedDataAsync = createAsyncThunk(
  "transcribe/store",
  async (data) => {
    const response = await transcribeAPI.storeTranscribedData(data);
    return response.data;
  }
);

export const markImageAsUnclearAsync = createAsyncThunk(
  "transcribe/unclear",
  async (data) => {
    const response = await transcribeAPI.markImageAsUnclear(data);
    return response.data;
  }
);

export const transcribeSlice = createSlice({
  name: "pollingUnits",
  initialState,
  reducers: {},
  extraReducers: {
    [storeTranscribedDataAsync.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default transcribeSlice.reducer;
