import api from "../api";

export function getPromotions() {
  return api.get("/promocoes")
}