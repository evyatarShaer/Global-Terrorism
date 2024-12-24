import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deadliestAttackTypesModel } from "../../types/deadliestAttackTypes";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

interface UserState {
  deadliestAttackTypesList: deadliestAttackTypesModel[] | [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
const initialState: UserState = {
  deadliestAttackTypesList: [],
  status: "idle",
  error: null,
};

export const fetchDeadliestAttackTypes = createAsyncThunk("deadliestAttackTypes/fetchDeadliestAttackTypes", async () => {
    const response = await axios.get<deadliestAttackTypesModel[]>(`${BASE_URL}deadliest-attack-types`);
    return response.data;
  }
);

export const deadliestAttackTypesSlice = createSlice({
    name: "deadliestAttackTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeadliestAttackTypes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeadliestAttackTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.deadliestAttackTypesList = action.payload;
      })
      .addCase(fetchDeadliestAttackTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  }
});

export default deadliestAttackTypesSlice.reducer;
