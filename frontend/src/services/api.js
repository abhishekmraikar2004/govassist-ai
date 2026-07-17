import axios from 'axios'

const baseURL = "https://govassist-ai-2.onrender.com"

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api

