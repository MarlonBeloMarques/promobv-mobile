import { encrypt, decrypt } from "react-native-simple-encryption";

export function FormatCurrentDate() {
  var data = new Date(),
    dia = data.getDate().toString(),
    diaF = dia.length == 1 ? "0" + dia : dia,
    mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
    mesF = mes.length == 1 ? "0" + mes : mes,
    anoF = data.getFullYear();
  return diaF + "/" + mesF + "/" + anoF;
}

export function EncryptedLinking(id) {
  let link = `n9R5${id}$7x87C4RyXc`

  let linkencrypt = encrypt("key secury linking promobv", link);  
  return linkencrypt
}

export function DecryptedLinking(encrypt) {
  let linkdescrypt = decrypt("key secury linking promobv", encrypt);
  let id = linkdescrypt.charAt(4);
  return parseInt(id)
}