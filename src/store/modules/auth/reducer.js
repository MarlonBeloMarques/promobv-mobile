import types from "./types";

const INITIAL_STATE = {
  token: null,
  idUser: 0,
  signed: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SIGN_IN_SUCCESS:
      return {
        token: action.payload.token,
        idUser: action.payload.idUser,
        signed: true,
      };
    case types.SIGN_OUT_REQUEST:
      return INITIAL_STATE;
    default:
      return state;
  }
}
