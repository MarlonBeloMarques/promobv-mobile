import types from './types'

export function setCategoryPromotions(id, name) {
  return {
    type: types.GET_CATEGORY_PROMOTIONS,
    payload: { id, name },
  }
}