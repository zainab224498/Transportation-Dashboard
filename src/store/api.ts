// ** Axios Imports
import axios from 'axios'

// Create an Axios instance with the updated base URL

const api = axios.create({
  baseURL: 'https://transport-api.axtro-soft.com/api/v1'
})

export default api
