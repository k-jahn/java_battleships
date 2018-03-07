import apiService from "../../service/api";
import * as types from "./actionTypes";



export function logout() {
  console.log('l')
  return async (dispatch, getState) => {
    try {
      const response = await apiService.postLogout()
      if (response) dispatch({ type: types.AUTH_LOGOUT_SUCCESS })
      else dispatch({ type: types.AUTH_LOGOUT_FAIL })
    } catch (error) {
      dispatch({ type: types.AUTH_LOGOUT_FAIL });
      console.error(error);
    }
  }
}

export function login(username, password) {
  return async (dispatch, getState) => {
    try {
      const response = await apiService.postLogin(username, password);
      if (response) dispatch({ type: types.AUTH_LOGIN_SUCCESS, user: response.user });
      else dispatch({ type: types.AUTH_LOGIN_FAIL });
    } catch (error) {
      dispatch({ type: types.AUTH_LOGIN_FAIL });
      console.error(error);
    }
  };
}

