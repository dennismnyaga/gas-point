/* eslint-disable prettier/prettier */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import getApiUrl from "../../../urlsPath"




interface Order {
  id: string;
}




const apiUrl = getApiUrl()
// Define the allowed values for status
type Status = "idle" | "loading" | "succeeded" | "failed";

// Extend the OrderState interface
interface OrderState {
  order: Order | null;
  status: Status; // For general actions like fetching order
  error: string | null | undefined; // General error state
 


}

// Define the initial state according to the updated interface
const initialState: OrderState = {
  order: null,
  status: "idle", // Default general status
  error: null, // Default error state
 

};



  export const addOrder = createAsyncThunk(
    "order/addOrder",
    async ({orderData}:{orderData:any}) => {
      const response = await axios.post(`${apiUrl}/addorder/`, orderData)
      console.log('Cart response ', response.data)
      return response.data
    },
  )


const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder

      
      .addCase(addOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

  },
});

export const selectOrderorder = (state: { order: OrderState }) => state.order.order;
export const getOrderStatus = (state: { order: OrderState }) => state.order.status;
export const getOrderError = (state: { order: OrderState }) => state.order.error;

export default orderSlice.reducer;