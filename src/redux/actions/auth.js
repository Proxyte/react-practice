import axios from "axios";
import { AUTH_SUCCESS, AUTH_LOGOUT } from "./actionTypes";

export function auth(email, password, isLogin) {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url = "";

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBMWZrMMw8LI7k4chECb7Ft6BkLHHez2TM";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBMWZrMMw8LI7k4chECb7Ft6BkLHHez2TM";
    }

    const response = await axios.post(url, authData);
    const data = response.data;

    const expirationDate = new Date().getTime() + data.expiresIn * 1000;

    console.log("i am here bro");

    localStorage.setItem("token", data.idToken);
    localStorage.setItem("localId", data.localId);
    localStorage.setItem("expirationDate", expirationDate);

    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));
  };
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  };
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
}

export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("localId");
  localStorage.removeItem("expirationDate");
  return {
    type: AUTH_LOGOUT,
  };
}
