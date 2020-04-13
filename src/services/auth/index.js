import api from '../api'

export function signIn (email, senha) {
  return api.post('/login',
  {email, senha}
  )
}