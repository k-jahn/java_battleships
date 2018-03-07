import apiService from "../../service/api";
import * as types from "./actionTypes";





export function fetchGames() {
  return async (dispatch, getState) => {
    try {
      const games = await apiService.getGames();
      dispatch({ type: types.GAMES_FETCHED, games: games });
    } catch (error) {
      console.error(error);
    }
  };
}


export function postLogin(username,password) {
  return async (dispatch, getState) => {
    console.log(password)
    try {
      const response = await apiService.postLogin(username,password);
      console.log(response)
      fetchGames();
    } catch (error) {
      console.error(error);
    }
  };
}