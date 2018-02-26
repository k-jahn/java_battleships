import apiService from "../../service/api";
import * as types from "./actionTypes";



export function fetchLeaderboard() {
  return async (dispatch, getState) => {
    try {
      const leaderboard = await apiService.getLeaderBoard();
      dispatch({ type: types.LEADERBOARD_FETCHED, leaderboard: leaderboard });
    } catch (error) {
      console.error(error);
    }
  };
}