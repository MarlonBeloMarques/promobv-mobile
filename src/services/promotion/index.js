import api from "../api";

export function getPromotions(page = 0, linesPerPage = 24) {
  return api.get(`/promocoes?&page=${page}&linesPerPage=${linesPerPage}`)
}

export function getPromotion(id) {
  return api.get(`/promocoes/${id}`)
}

export function getPromotionsByCategory(id, page = 0, linesPerPage = 24) {
  return api.get(`/promocoes/categoria/${id}?&page=${page}&linesPerPage=${linesPerPage}`)
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

export function deletePromotion(id) {
  return api.delete(`/promocoes/${id}`)
}