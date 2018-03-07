import * as types from "./actionTypes";


const initialState = {
  user: null,
  loginFail: false,
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.AUTH_LOGIN_SUCCESS:
      return {...state, user: action.user, loginFail: false};
    case types.AUTH_LOGIN_FAIL:
      return {...state, user: null, loginFail: true};
    case types.AUTH_LOGOUT_SUCCESS:
      console.log('logout')
      return {...state, user: null, loginFail: false}
    default:
      return state;
  }
}




// selectors =============================================================


export function getUser(state) {
  return state.auth.user;
}


