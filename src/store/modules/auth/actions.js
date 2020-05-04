import types from './types'

export function signInSuccess(token, idUser) {
  return {
    type: types.SIGN_IN_SUCCESS,
    payload: { token, idUser },
  };
}

export function signOutRequest() {
  return {
    type: types.SIGN_OUT_REQUEST,
  };
}