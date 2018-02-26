import apiService from "../../service/api";
import * as types from "./actionTypes";





export function fetchGameView(id) {
  return async (dispatch, getState) => {
    try {
      const gameView = await apiService.getGameView(id);
      dispatch({ type: types.GAME_VIEW_FETCHED, gameView: gameView });
    } catch (error) {
      console.error(error);
    }
  };
}