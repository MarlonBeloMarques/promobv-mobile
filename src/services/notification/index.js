import api from "../api";

export function getNotifications() {
  return api.get('/notificacoes')
}