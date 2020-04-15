import api from "../api";

export function getPromotions() {
  return api.get("/promocoes")
}

export function getPromotion(id) {
  return api.get(`/promocoes/${id}`)
}

export function getMyPromotions() {
  return api.get('/promocoes/user')
}