import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    products: [{
        name: "Mobile",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguPq54fVlmq5XHTxw0Qov1_6CzSiSPPmtiw&s",
        price: 80000,
        brand: "iphone",
        description:
            " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, dignissimos?",
        location: "Mumbai",
        date: "23 Aug",
    },]
}


const cartSlice = createSlice({
    name: "cartItems",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.products.push(action.payload)
        },
        removeFromCart: () => { },

    }
})



export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer;