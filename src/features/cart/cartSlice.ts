import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the CartItem interface
interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

// Define the initial state, loading from localStorage if it exists
const initialState: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const updatedState = state.filter(item => item.id !== action.payload);
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedState));
      return updatedState;
    },
    clearCart: (state) => {
      localStorage.removeItem('cart');
      return [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
