import axios from 'axios';
import { ref } from 'vue'


const VOTRE_TOKEN = localStorage.getItem('token')


export const apiGet = async (url) => {
  // console.log("token", VOTRE_TOKEN);

  try {
    const response = await axios.get(url, {
      headers: {
       Accept: 'application/json',
      },
    })
    //console.log(' Réponse API :', response.data)
    return response.data
  }
  catch (err) {
    console.error(' Erreur API :', err)
    const message = err.message || 'Erreur inconnue'
    return { data: null, error: message }
  }
}


export const apiPost = async ($url, $data) => {
  const VOTRE_TOKEN = localStorage.getItem('token')
  //console.log("token", VOTRE_TOKEN);

  const error = ref(null)

  try {
    const response = await axios.post($url, $data, {
      headers: {
        Authorization: `Bearer ${VOTRE_TOKEN}`,
      },
    })
    console.log('response ==>', response.data)
    return response
  } catch (err) {
    console.error("Erreur API lors de ll'utilisation du helpears apiPost :", err)
    error.value = err.message
    return error.value
  }
}

export const apiPut = async (url, data) => {
  const error = ref(null)

  try {
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${VOTRE_TOKEN}`,
      },
    })
    console.log('response ==>', response.data)
    return response
  } catch (err) {
    console.error("Erreur API lors de ll'utilisation du helpears apiPost :", err)
    error.value = err.message
    return { error: error.value }
  }
}

export const apiDelete = async (url) =>{
   const error = ref(null)

  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${VOTRE_TOKEN}`,
      },
    })
    console.log('response ==>', response.data)
    return response
  } catch (err) {
    console.error("Erreur API lors de ll'utilisation du helpears apiDelete :", err)
    error.value = err.message
    return error.value
  }

}
