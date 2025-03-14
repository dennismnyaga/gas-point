/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import getApiUrl from "../../../urlsPath"



interface Analytics {
  id: string;
  shop: {
      id: string;
      name: string;
  },
  quantity: number;
  from_date: string;
  to_date: string;
}




const apiUrl = getApiUrl()
// Define the allowed values for status
type Status = "idle" | "loading" | "succeeded" | "failed";

// Extend the AnalyticsState interface
interface AnalyticsState {
  analytics: Analytics[];
  status: Status; // For general actions like fetching product
  error: string | null | undefined; // General error state
 

}

// Define the initial state according to the updated interface
const initialState: AnalyticsState = {
  analytics: [],
  status: "idle", // Default general status
  error: null, // Default error state
  

};

export const fetchAnalytics = createAsyncThunk("products/fetchAnalytics", async () => {

  // await new Promise((resolve) => setTimeout(resolve, 30000))
  const response = await axios.get(`${apiUrl}/analytics`);
  return response.data;
});


const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAnalytics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.analytics = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

  },
});

export const selectAllAnalytics = (state: { analytics: AnalyticsState }) => state.analytics.analytics;
export const getAnalyticstatus = (state: { analytics: AnalyticsState }) => state.analytics.status;
export const getAnalyticsError = (state: { analytics: AnalyticsState }) => state.analytics.error;

export default analyticsSlice.reducer;