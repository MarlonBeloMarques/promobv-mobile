import axios from 'axios'
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from '../../config';
import AlertMessage from '../components/Alert';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    responseType: "text",
  },
});

//solicitacao
api.interceptors.request.use(async function (config) {
  // Faça algo antes que a solicitação seja enviada

  const userToken = await SecureStore.getItemAsync('user_token')

  let N = api.defaults.baseURL.length

  let requestToApi = config.baseURL.substring(0, N) == api.defaults.baseURL // verifica se os dados do config é igual da api

  // se for entao pode enviar o authorization
  if(userToken && requestToApi) {
    config.headers.Authorization = `Bearer ${JSON.parse(userToken)}`
  }

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

  let errorObj = error.response.data

  switch (errorObj.status) {
    case 401:
      handle401();
      break;
    case 403:
      handle403();
      break;
    case 422:
      handle422(errorObj);
      break;
    default:
      handleDefaultError(errorObj);
      break;
  }

  function handleDefaultError(errorObj) {
    console.log(
      `DEFAULT ERROR: ${errorObj.status} : ${errorObj.error}, message: ${errorObj.message}`
    );
  }
  function handle422(errorObj) {
    console.log(
      `DEFAULT ERROR: ${errorObj.status} : ${
        errorObj.error
      }, errors: ${listErrors(errorObj.errors)}`
    );
  }
  function handle401() {
    console.log(
      `ERROR: ${errorObj.status} : ${errorObj.error}, message: ${errorObj.message}`
    );
  }
  function handle403() {
    AlertMessage({
      title: "Atenção",
      message: "Sua sessão expirou.",
    });
  }

 function listErrors(messages) {
   let s = "";
   for (const iterator of messages) {
     s +=
       "fieldName : " +
       iterator.fieldName +
       ", message :" +
       iterator.message +
       "\n";
   }
   return s;
 }

  return Promise.reject(error)
})


export default api