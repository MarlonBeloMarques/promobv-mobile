import types from './types'

const INITIAL_STATE = {
  id: 0,
  name: ''
}

export default function category(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_CATEGORY:
      return {
        id: action.payload.id,
        name: action.payload.name
      };
    default:
      return state;
  }
}