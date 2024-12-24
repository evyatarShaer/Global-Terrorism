import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HighestCasualtyRegionsModel } from "../../types/highestCasualtyRegions";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

interface UserState {
  HighestCasualtyRegionsList: HighestCasualtyRegionsModel[] | [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
const initialState: UserState = {
  HighestCasualtyRegionsList: [],
  status: "idle",
  error: null,
};

export const fetchHighestCasualtyRegions = createAsyncThunk("highestCasualtyRegions/fetchHighestCasualtyRegions", async (groupByErea: string) => {
  const response = await axios.get<HighestCasualtyRegionsModel[]>(
    `${BASE_URL}highest-casualty-regions/${groupByErea}`
  );
  return response.data;
  });

export const highestCasualtyRegionsSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHighestCasualtyRegions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHighestCasualtyRegions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.HighestCasualtyRegionsList = action.payload;
      })
      .addCase(fetchHighestCasualtyRegions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default highestCasualtyRegionsSlice.reducer;
