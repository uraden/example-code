import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: string | number;
    name: string;
    price: string | number;
    description: string;
    files: any;
    quantity: number;
    _id?: any
}

interface CartState {
    items: CartItem[];
}


const initialState: CartState = {
    items: [],
}; 

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<CartItem>) => {
            const { _id, quantity } = action.payload;
            const existingCartItem = state.items.find((item) => item._id === _id);

            if (existingCartItem) {
                existingCartItem.quantity += quantity;
            } else {
                // If item doesn't exist, push a new item
                state.items.push(action.payload);
            }
        },
        removeItemFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item._id !== action.payload
            );
        },

        removeItemByQuantity: (state, action: PayloadAction<number>) => {
            const existingCartItem = state.items.find((item) => item._id === action.payload);
            if (existingCartItem) {
                existingCartItem.quantity -= 1;
                if(existingCartItem.quantity === 0) {
                    state.items = state.items.filter(
                        (item) => item._id !== action.payload
                    );
                }
            }

        },
        updateQuantity: ( state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const existingCartItem = state.items.find((item) => item.id === id);
            if (existingCartItem) {
                existingCartItem.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const { addItemToCart, removeItemFromCart, updateQuantity, clearCart, removeItemByQuantity } = cartSlice.actions;
export default cartSlice.reducer;