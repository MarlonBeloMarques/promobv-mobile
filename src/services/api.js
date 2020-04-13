import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.4.5:8086/',
  headers: {
    'Content-Type': 'application/json'
  }
})

//solicitacao
api.interceptors.request.use(function (config) {
  // Faça algo antes que a solicitação seja enviada
  return config
}, function (error) {
  // Faça algo com erro de solicitação
  return Promise.reject(error)
})

//resposta
api.interceptors.response.use(function (response) {
  // Qualquer código de status que esteja dentro do intervalo de 2xx faz com que esta função seja acionada
  // Faça algo com dados de resposta
  // console.log ('resposta interceptada:', response.data)
  return response
}, function (error) {
  // Qualquer código de status que esteja fora do intervalo de 2xx faz com que esta função seja acionada
  // Faça algo com erro de resposta
  // console.log ('resposta interceptada:', error.response.data)
  console.log(`API RESPONSE ${error.response.data.status} : ${error.response.data.code}`)
  return Promise.reject(error)
})

export default api