import axios from 'axios'
import { getCookie } from '@/Cookies'

let Login = axios.create({
  headers: {
    'Authorization': 'Basic MTIwYzczYjYwZTkyNGZjYjljNDJmZjg3MTcyYzNmNWM6WVJ6MDluYm8wZFRkT0pKZ3JMZldhRVpnNjV1NkRJWG4='
  }
})

let Api = axios.create({
  headers: {
    'Authorization': 'Bearer ' + getCookie('token'),
    'Accept': 'application/json'
  }
})

export { Login, Api }
