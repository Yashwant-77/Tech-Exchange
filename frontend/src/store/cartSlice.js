import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartItems: []
}


const cartSlice = createSlice({
    name: "cartItems",
    initialState,
    reducers: {
        setCartItems:(state , action)=>{
            state.cartItems = action.payload;
        },
        addToCart: (state, action) => {
            const id = action.payload.id;
            const exists = state.cartItems.find((p) => p.id === id);
            if (exists) {
                exists.qty += 1;
                return;
            }
            else {

                state.cartItems.push({ ...action.payload, qty: 1 })
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter((p) => p.id !== id);

        },

        increaseQty: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.find((p) => p.id === id);

            if (item) {
                item.qty += 1;
            }


        },
        decreaseQty: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.find((p) => p.id === id);

            if (item && item.qty > 1) {
                item.qty -= 1;
            }


        },
        updateCartQty: (state, action) => {
            const { id, qty } = action.payload;
            const item = state.cartItems.find((p) => p.id === id);

            if (item) {
                item.qty = qty;
            }
        },

        clearCart: (state) => {
            state.cartItems = [];
        },

        checkedCartItems: (state, action) => {
            const { id, checked } = action.payload;
            const item = state.cartItems.find((p) => p.id === id);
            if (item) {
                item.checked = checked;
            }
        }

    }
})



export const { addToCart, removeFromCart, increaseQty, decreaseQty, updateCartQty, clearCart ,checkedCartItems , setCartItems  } = cartSlice.actions

export default cartSlice.reducer;