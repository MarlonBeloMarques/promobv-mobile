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

export function updatePromotion(id, descricao, preco, localizacao, endereco, titulo, idCategoria) {
  return api.put(`/promocoes/${id}`, {descricao, preco, localizacao, endereco, titulo, idCategoria})
}