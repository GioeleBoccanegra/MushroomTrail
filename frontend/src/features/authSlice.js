import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  isAuthenticated: false,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    }
  },
});


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

