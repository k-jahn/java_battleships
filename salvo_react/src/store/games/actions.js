import apiService from "../../service/api";
import * as types from "./actionTypes";





export function fetchActiveGames() {
  return async (dispatch, getState) => {
    try {
      // const activeGames = gameData.active_games
      // const gamesService = new GamesService();
      const activeGames = apiService.getActiveGamesFromServer();
      dispatch({ type: types.GAMES_FETCHED, activeGames: activeGames });
    } catch (error) {
      console.error(error);
    }
  };
}