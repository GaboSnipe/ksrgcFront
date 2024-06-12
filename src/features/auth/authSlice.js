import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  refresh: localStorage.getItem('refresh') || false,
  token: localStorage.getItem('token') || false,
  isLoggedIn: localStorage.getItem('token') ? true : false,
  userData: null,
  darkMode: localStorage.getItem('darkMode')
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isLoggedIn = true;
      state.token = localStorage.getItem('token');
      state.refresh = localStorage.getItem('refresh');
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.token = false;
      state.refresh = false;
    },
    changeMode: (state) => {
      state.darkMode = !state.darkMode;
      const currentMode = localStorage.getItem("darkMode") === "true";
      const newMode = !currentMode;
      if (newMode) {
        document.querySelector('html').setAttribute('data-theme', "dark");
      } else {
        document.querySelector('html').setAttribute('data-theme', "light");
      }
    }
  },
});

export const { loginUser, logoutUser, getUserData, changeMode } = authSlice.actions;

export default authSlice.reducer;
