import * as types from "./actionTypes";


const initialState = {
  games: []
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.GAMES_FETCHED:
      return {...state, games: action.games}
    default:
      return state;
  }
}

// selectors =============================================================


export function getActiveGames(state) {
  console.log(state)
  return state.games.games.active_games;
}
