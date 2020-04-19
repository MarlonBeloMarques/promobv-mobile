import types from './types'

export function signInSuccess(token) {
  return {
    type: types.SIGN_IN_SUCCESS,
    payload: { token },
  };
}

export function signOutRequest() {
  return {
    type: types.SIGN_OUT_REQUEST,
  };
}