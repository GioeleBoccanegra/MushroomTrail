import store from "../app/store";
import { logout } from "../features/authSlice";


export const getValidToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    store.dispatch(logout());
    window.location.href = "/login";

    return null;
  }
  return token;
}