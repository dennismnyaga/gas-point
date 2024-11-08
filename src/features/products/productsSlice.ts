/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import getApiUrl from "../../../urlsPath"



interface Products {
  id: string;
  brand: {
    id: string;
    name:string;
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
//   productExists: boolean; // To track if a product already exists

  // New properties for addproduct specific state
//   addproductStatus: Status; // Specifically for addproduct loading state
//   addproductError: string | null | undefined; // Specifically for addproduct error state

//   updateproductStatus: Status;
//   updateproductError: string | null | undefined;


//   deleteThisproductStatus: Status;
//   deleteThisproductError: string | null | undefined;



}

// Define the initial state according to the updated interface
const initialState: ProductsState = {
  products: [],
  status: "idle", // Default general status
  error: null, // Default error state
//   productExists: false, // Default state for product existence

  // Initialize new state properties for addproduct
//   addproductStatus: "idle", // Default state for adding product
//   addproductError: null, // No error initially for addproduct

//   updateproductStatus: 'idle',
//   updateproductError: null,

//   deleteThisproductStatus: 'idle',
//   deleteThisproductError: null,

};



// export const checkproductExists = createAsyncThunk(
//   "product/checkproductExists",
//   async (productName: string) => {
//     const response = await axios.get(`${apiUrl}/check_emplyee_exists?name=${productName}`);
//     return response.data.exists; // Return a boolean value
//   }
// );



export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get<Products[]>(`${apiUrl}`);
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
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      
  },
});

export const selectAllProduct = (state: { products: ProductsState }) => state.products.products;
export const getProductStatus = (state: { products: ProductsState }) => state.products.status;
export const getProductError = (state: { products: ProductsState }) => state.products.error;

export default productsSlice.reducer;