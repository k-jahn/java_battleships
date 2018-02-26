import * as types from "./actionTypes";


const initialState = {
  game: {}
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.GAME_VIEW_FETCHED:
      const game = {...state.game}
      game[action.gameView.id] = action.gameView
      return { ...state, game: game } 
    default:
      return state;
  }
}

// selectors =============================================================


export function getGameView(state) {
  console.log(state)
  return state;
}
