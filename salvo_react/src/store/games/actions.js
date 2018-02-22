import gamesService from "../../service/games";
import * as types from "./actionTypes";





export function fetchActiveGames() {
  return async (dispatch, getState) => {
    try {
      // const activeGames = gameData.active_games
      // const gamesService = new GamesService();
      console.log(gamesService)
      const activeGames = gamesService.getActiveGamesFromServer();
      dispatch({ type: types.GAMES_FETCHED, activeGames: activeGames });
    } catch (error) {
      console.error(error);
    }
  };
}