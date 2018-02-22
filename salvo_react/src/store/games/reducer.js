import * as types from "./actionTypes";


const initialState = {
  activeGames: []
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.GAMES_FETCHED:
      return {...state, activeGames: action.activeGames}
    default:
      return state;
  }
}

// selectors =============================================================


export function getActiveGames(state) {
  return state.activeGames;
}
