import types from './types'

const INITIAL_STATE = {
  id: 1,
  name: 'Auto e Peças'
}

export default function category(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_CATEGORY_UPDATEANDINSERT:
      return {
        id: action.payload.id,
        name: action.payload.name
      };
    default:
      return state;
  }
}