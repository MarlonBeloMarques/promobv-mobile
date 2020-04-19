import types from './types'

export function setCategory(id, name) {
  return {
    type: types.GET_CATEGORY,
    payload: { id, name },
  }
}