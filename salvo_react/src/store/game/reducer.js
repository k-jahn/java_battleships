import * as types from "./actionTypes";


const initialState = {
  game: {}
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.GAME_FETCHED:
      let nextState = {...state}
      nextState.game[action.gameView.player.id] = action.gameView
      return nextState; 
    case types.GAME_CLEAR:
      return {...state, game: {}}
    default:
      return state;
  }
}

// selectors =============================================================


export function getGameView(state,id) {
  const game = state.game.game[id];
  return game
}
