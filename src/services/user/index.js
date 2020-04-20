import api from "../api";

export function getUser(email) {
  return api.get(`/usuarios/email?value=${email}`);
}

export function updateUser(id, nome, cpf, telefone, dataDeNascimento) {
  return api.put(`/usuarios/${id}`, {nome, cpf, telefone, dataDeNascimento} )
}

export function setUser(apelido, email, senha) {
  return api.post('/usuarios', {apelido, email, senha})
}