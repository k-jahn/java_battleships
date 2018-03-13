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

