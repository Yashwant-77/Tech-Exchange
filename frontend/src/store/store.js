import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice';
import cartReducer from './cartSlice'
import alertReducer from './alertSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        cartItems: cartReducer,
        alert: alertReducer,
    },
});


