import axios from 'axios'
export default axios.create({
  baseURL: 'http://localhost:1337/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})
