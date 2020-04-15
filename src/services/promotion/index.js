import api from "../api";

export function getPromotions() {
  return api.get("/promocoes")
}

export function getPromotion(id) {
  return api.get(`/promocoes/${id}`)
}