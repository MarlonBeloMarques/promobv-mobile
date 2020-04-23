import api from "../api";

export function getPromotions() {
  return api.get("/promocoes")
}

export function getPromotion(id) {
  return api.get(`/promocoes/${id}`)
}

export function getPromotionsByCategory(id) {
  return api.get(`/promocoes/categoria/${id}`)
}

export function getMyPromotions() {
  return api.get('/promocoes/user')
}

export function updatePromotion(id, descricao, preco, localizacao, endereco, titulo, idCategoria) {
  return api.put(`/promocoes/${id}`, {descricao, preco, localizacao, endereco, titulo, idCategoria})
}

export function setPromotion(descricao, preco, localizacao, endereco, titulo, idCategoria) {
  return api.post(`/promocoes`, {descricao, preco, localizacao, endereco, titulo, idCategoria})
}

export function setPromotionPicture(id, data) {
  return api.post(`/promocoes/${id}/picture`, data,
  { 
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}