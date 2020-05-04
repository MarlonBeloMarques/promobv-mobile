import types from './types'

export function setCategoryUpdateAndInsert(id, name) {
  return {
    type: types.GET_CATEGORY_UPDATEANDINSERT,
    payload: { id, name },
  }
}