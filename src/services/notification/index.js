import api from "../api";

export function getNotifications(page = 0, linesPerPage = 24) {
  return api.get(`/notificacoes?&page=${page}&linesPerPage=${linesPerPage}`)
}

export function interactNotification(data, hora, tipo, idUsuario, idPromocao) {
  return api.post('/notificacoes', { data, hora, tipo, idUsuario, idPromocao })
}

export function checkReports(id) {
  return api.get(`/notificacoes/check-denuncias/user/${id}`)
}
