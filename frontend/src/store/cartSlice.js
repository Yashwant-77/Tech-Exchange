import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartItems: []
}


const cartSlice = createSlice({
    name: "cartItems",
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },
        addToCart: (state, action) => {
            const id = action.payload._id;
            const exists = state.cartItems.find((p) => p._id === id);
            if (!exists) {
                state.cartItems.push({ ...action.payload, qty: 1 })
            }

        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter((p) => p._id !== id);
        },

        increaseQty: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.find((p) => p._id === id);

            if (item) {
                item.qty = (item.qty || 0) + 1;
            }
        },
        decreaseQty: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.find((p) => p._id === id);

            if (item && item.qty > 1) {
                item.qty -= 1;
            }

        },

        clearCart: (state) => {
            state.cartItems = [];

        },

        checkedCartItems: (state, action) => {
            const { id, checked } = action.payload;
            const item = state.cartItems.find((p) => p._id === id);
            if (item) {
                item.checked = checked;
            }
        }

    }
})






export const { addToCart, removeFromCart, increaseQty, decreaseQty, updateCartQty, clearCart, checkedCartItems, setCartItems } = cartSlice.actions

export default cartSlice.reducer;