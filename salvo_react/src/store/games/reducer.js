import * as types from "./actionTypes";

const initialState = {
  activeGames: [],
  pastGames: [],
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.GAMES_FETCHED:
      console.log(action)
      return {...state,
        activeGames: action.games.active_games,
        pastGames: action.games.past_games,
      }
    default:
      return state;
  }
}

// selectors =============================================================
export function getActiveGames(state) {
  return state.games.activeGames;
}

export function getPastGames(state) {
  console.log(state.games)
  return state.games.pastGames;
}
