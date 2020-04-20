import types from './types'

const INITIAL_STATE = {
  id: 0,
  name: 'Geral'
}

export default function category(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_CATEGORY_PROMOTIONS:
      return {
        id: action.payload.id,
        name: action.payload.name
      };
    default:
      return state;
  }
}