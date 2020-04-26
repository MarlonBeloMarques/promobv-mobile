import api from "../api";

export function getNotifications() {
  return api.get('/notificacoes')
}

export function interactNotification(data, hora, tipo, idUsuario, idPromocao) {
  return api.post('/notificacoes', { data, hora, tipo, idUsuario, idPromocao })
}