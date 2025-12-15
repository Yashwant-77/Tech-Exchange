// src/store/alertSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  type: "info",      // 'success' | 'error' | 'warning' | 'info'
  message: "klklfjdlkjflkjdl",
  duration: 3000,    // ms
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(state, action) {
      const { type = "info", message = "", duration = 3000 } = action.payload || {};
      state.visible = true;
      state.type = type;
      state.message = message;
      state.duration = duration;
    },
    hideAlert(state) {
      state.visible = false;
      state.message = "";
    },
    // optional: clear to reset everything
    clearAlert(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { showAlert, hideAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
