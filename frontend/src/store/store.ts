import { configureStore } from "@reduxjs/toolkit";
import highestCasualtyRegionsSliceReducer from "./features/terrorSlice";
import deadliestAttackTypesReducer from "./features/deadliestAttackTypesSlice";

export const store = configureStore({
  reducer: {
    highestCasualtyRegions: highestCasualtyRegionsSliceReducer,
    deadliestAttackTypes: deadliestAttackTypesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;