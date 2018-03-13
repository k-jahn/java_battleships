import apiService from "../../service/api";
import * as gamesActions from "../games/actions"
import * as types from "./actionTypes";



export function logout() {
  console.log('l')
  return async (dispatch, getState) => {
    try {
      const response = await apiService.postLogout()
      if (response) {
        dispatch({ type: types.AUTH_LOGOUT_SUCCESS })
        dispatch(gamesActions.fetchGames())
      }
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
      if (response)  {
        dispatch({ type: types.AUTH_LOGIN_SUCCESS, user: response.user } );
        dispatch(gamesActions.fetchGames());
      }
      else dispatch({ type: types.AUTH_LOGIN_FAIL });
    } catch (error) {
      dispatch({ type: types.AUTH_LOGIN_FAIL });
      console.error(error);
    }
  };
}


export function signup(username, password) {
  return async (dispatch, getState) => {
    try {
      const response = await apiService.postSignup(username, password);
      if (response)  {
        dispatch({ type: types.AUTH_SIGNUP_SUCCESS, user: response.user } );
        dispatch(gamesActions.fetchGames());
      }
      else dispatch({ type: types.AUTH_SIGNUP_FAIL });
    } catch (error) {
      dispatch({ type: types.AUTH_SIGNUP_FAIL });
      console.error(error);
    }
  };
}

