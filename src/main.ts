import { createApp } from 'vue'
import WeatherWidget from './App.vue'
import App from './App.vue'

// 👇 This code to be used as ( snippet: <weather-widget /> ) in HTML, but we need ( <weather-widget /> ) to be inside a div with id='app'.
const app = createApp({})
app.component('weather-widget', WeatherWidget).mount('#app')

// 👇 This сode is default use vue without ( snippet: <weather-widget /> ) if we don't need it
// createApp(App).mount('#app')
