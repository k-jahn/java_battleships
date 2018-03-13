import * as types from "./actionTypes";


const initialState = {
  user: null,
  loginFailed: false,
  signupFailed: false,
  
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.AUTH_LOGIN_SUCCESS:
      return {...state, user: action.user, loginFailed: false};
    case types.AUTH_LOGIN_FAIL:
      return {...state, user: null, loginFailed: true};
    case types.AUTH_SIGNUP_SUCCESS:
      return {...state, user: action.user, signupFailed: false};
    case types.AUTH_SIGNUP_FAIL:
      return {...state, user: null, signupFailed: true};
    case types.AUTH_LOGOUT_SUCCESS:
      return {...state, user: null, loginFailed: false}
    default:
      return state;
  }
}




// selectors =============================================================


export function getUser(state) {
  return state.auth.user;
}
export function getLoginFailed(state) {
  return state.auth.loginFailed;
}

export function getSignupFailed(state) {
  return state.auth.hasLoginFailed;
}


