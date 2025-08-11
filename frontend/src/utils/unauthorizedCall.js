
import store from "../app/store";
import { logout } from "../features/authSlice";
export default function unauthorizedCall(res) {
  if (res.status == 401) {

    store.dispatch(logout());
    window.location.href = "/login";
    throw new Error("token scaduto, rieffettuare il login");
  }
  return true;
} 