/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import getApiUrl from "../../../urlsPath"



interface Products {
  id: string;
  brand: {
    id: string;
    name: string;
  };
  product_type: {
    id: string;
    name: string;
  };
  weight: {
    id: string;
    weight: string;
  };
  sold_as: {
    id: string;
    name: string;
  }
  name: string;
  price: number;
  description: string;
  date_added: string;
  image: string
}




const apiUrl = getApiUrl()
// Define the allowed values for status
type Status = "idle" | "loading" | "succeeded" | "failed";

// Extend the ProductsState interface
interface ProductsState {
  products: Products[];
  status: Status; // For general actions like fetching product
  error: string | null | undefined; // General error state
  count: number; // Total number of products
  next: string | null; // Next page URL
  previous: string | null; // Previous page URL
  currentPage: number; // Current page

}

// Define the initial state according to the updated interface
const initialState: ProductsState = {
  products: [],
  status: "idle", // Default general status
  error: null, // Default error state
  count: 0,
  next: null,
  previous: null,
  currentPage: 1,

};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async ({ page = 1, pageSize = 2 }: { page: number; pageSize?: number }) => {
  const offset = (page - 1) * pageSize; 
  const response = await axios.get<{
    count: number;
    next: string | null;
    previous: string | null;
    results: Products[];
  // }>(`${apiUrl}?page=${page}&page_size=${pageSize}`);
  }>(`${apiUrl}?offset=${offset}&page_size=${pageSize}`);
  console.log('after offset ', response.data)
  return response.data;
});


const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.products = action.payload;

        state.products = action.payload.results; // Set current page's products
        state.count = action.payload.count; // Total number of products
        state.next = action.payload.next; // Next page URL
        state.previous = action.payload.previous; // Previous page URL
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

  },
});

export const selectAllProduct = (state: { products: ProductsState }) => state.products.products;
export const productCount = (state: {products: ProductsState}) => state.products.count;
export const getProductStatus = (state: { products: ProductsState }) => state.products.status;
export const getProductError = (state: { products: ProductsState }) => state.products.error;

export default productsSlice.reducer;