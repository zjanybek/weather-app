import axios from 'axios'

const apiKey = 'fb97b733bda13f852c3eb759d55088b0'
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`

const server = axios.create({
  baseURL: apiUrl
})

export default server
