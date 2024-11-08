/* eslint-disable prettier/prettier */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import getApiUrl from "../../../urlsPath"




interface Product {
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

// Extend the ProductState interface
interface ProductState {
  product: Product | null;
  status: Status; // For general actions like fetching product
  error: string | null | undefined; // General error state
 


}

// Define the initial state according to the updated interface
const initialState: ProductState = {
  product: null,
  status: "idle", // Default general status
  error: null, // Default error state
 

};





export const fetchProduct = createAsyncThunk<Product, string | number>(
  "product/fetchProduct",
  async (productId) => {
    // const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // // Wait for 30 seconds before making the API call
    // await delay(30000);
    const response = await axios.get<Product>(`${apiUrl}/details/${productId}/`);
    return response.data;
  });

// export const fetchProduct = createAsyncThunk<Product, string | number>(
//   "product/fetchProduct",
//   async (productId) => {
//     const fetchPromise = axios.get<Product>(`${apiUrl}/details/${productId}/`);

//     const timeoutPromise = new Promise<never>((_, reject) => {
//       setTimeout(() => {
//         reject(new Error("Request timed out after 30 seconds"));
//       }, 50000); // 30 seconds in milliseconds
//     });

//     // Use Promise.race to enforce the timeout
//     return await Promise.race([fetchPromise, timeoutPromise]).then(response => {
//       return (response as any).data; // Type assertion to handle the response correctly
//     });
//   }
// );





const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

  },
});

export const selectSingleProduct = (state: { product: ProductState }) => state.product.product;
export const getSingleProductStatus = (state: { product: ProductState }) => state.product.status;
export const getSingleProductError = (state: { product: ProductState }) => state.product.error;

export default productsSlice.reducer;