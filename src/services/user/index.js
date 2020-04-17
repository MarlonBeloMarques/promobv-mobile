import api from "../api";

export function getUser(email) {
  return api.get(`/usuarios/email?value=${email}`);
}