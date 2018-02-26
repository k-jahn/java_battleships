import * as types from "./actionTypes";


const initialState = {
  leaderboard: []
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.LEADERBOARD_FETCHED:
      return { ...state, leaderboard: action.leaderboard }
    default:
      return state;
  }
}

// selectors =============================================================


export function getRankedLeaderboard(state) {
  let rankedLeaderboard = state.leaderboard.leaderboard
    .slice()
    .sort((a, b) => b.score - a.score)
    .map((x, i, arr) => { return { ...x, rank: arr.map(p => +p.score).indexOf(x.score) +1 } });
  return rankedLeaderboard
}
