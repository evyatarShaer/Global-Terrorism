import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HighestCasualtyRegions } from "../../types/highestCasualtyRegions";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

interface UserState {
  HighestCasualtyRegionsList: HighestCasualtyRegions[] | [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
const initialState: UserState = {
  HighestCasualtyRegionsList: [],
  status: "idle",
  error: null,
};

export const getHighestCasualtyRegions = createAsyncThunk( "getHighestCasualtyRegions", () => {
  return axios.get<HighestCasualtyRegions[]>(`${BASE_URL}/highest-casualty-regions`);
});


export const highestCasualtyRegionsSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHighestCasualtyRegions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getHighestCasualtyRegions.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(getHighestCasualtyRegions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
  },
});
export default highestCasualtyRegionsSlice.reducer;
