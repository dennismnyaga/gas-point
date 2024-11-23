/* eslint-disable prettier/prettier */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import getApiUrl from "../../../../urlsPath";

// Define the structure of individual items in an order
interface OrderItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
  order: string;
}

// Define the structure of a customer
interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  date_added: string;
}

// Define the structure of an order
interface Order {
  id: string;
  items: OrderItem[];
  customer: Customer;
  order_number: number;
  location: string;
  time_ordered: string;
  dispatched: boolean;
  delivered: boolean;
}

// Define the allowed values for status
type Status = "idle" | "loading" | "succeeded" | "failed";

// Extend the OrderState interface
interface OrderState {
  orders: Order[]; // Orders should be an array
  status: Status; // For general actions like fetching order
  error: string | null; // General error state
}

// Define the initial state according to the updated interface
const initialState: OrderState = {
  orders: [], // Initialize as an empty array
  status: "idle", // Default general status
  error: null, // Default error state
};

const apiUrl = getApiUrl();

export const fetchOrder = createAsyncThunk(
  "orders/fetchOrder",
  async () => {
    const response = await axios.get<Order[]>(`${apiUrl}/administrator/orders/`);
    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async (
    { orderId, status }: { orderId: string; status: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put<Order>(
        `${apiUrl}/administrator/orders/${orderId}/update-status/`,
        { dispatched: status }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Unknown error occurred");
    }
  }
);

const adminOrdersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrder.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(
        updateOrderStatus.fulfilled,
        (state, action: PayloadAction<Order>) => {
          const updatedOrder = action.payload;
          const index = state.orders.findIndex(
            (order) => order.id === updatedOrder.id
          );
          if (index !== -1) {
            state.orders[index] = updatedOrder; // Update the order in state
          }
        }
      );
  },
});

// Selectors
export const selectAllOrders = (state: { orders: OrderState }) =>
  state.orders.orders;
export const getOrdersStatus = (state: { orders: OrderState }) =>
  state.orders.status;
export const getOrdersError = (state: { orders: OrderState }) =>
  state.orders.error;

export default adminOrdersSlice.reducer;
