import axios from 'axios'

let Login = axios.create({
  headers: {
    'Authorization': 'Basic MTIwYzczYjYwZTkyNGZjYjljNDJmZjg3MTcyYzNmNWM6WVJ6MDluYm8wZFRkT0pKZ3JMZldhRVpnNjV1NkRJWG4='
  }
})

let Api = axios.create({
})

export { Login, Api }
