import apiService from "../../service/api";
import * as gamesActions from '../games/actions';
import * as types from "./actionTypes";


export function clearGameView() {
  return async (dispatch, getState) => {
    dispatch({type: types.GAME_CLEAR})
  }
}


export function fetchGame(id) {
  return async (dispatch, getState) => {
    try {
      console.log(id)
      const gameView = await apiService.getGameView(id);
      dispatch({ type: types.GAME_FETCHED, gameView: gameView });
    } catch (error) {
      console.error(error);
    }
  };
}


export function joinGame(id) {
  return async (dispatch, getState) => {
    try {
      const gameView = await apiService.postJoinGame(id);
      dispatch(gamesActions.fetchGames());
      dispatch({ type: types.GAME_JOINED, gameView: gameView });
    } catch (error) {
      console.error(error);
    }
  };
}

export function createGame() {
  return async (dispatch, getState) => {
    try {
      const gameView = await apiService.postCreateGame();
      dispatch(gamesActions.fetchGames());
      dispatch({ type: types.GAME_JOINED, gameView: gameView });
    } catch (error) {
      console.error(error);
    }
  };
}