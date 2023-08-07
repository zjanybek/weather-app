import server from './server'
import { AxiosResponse } from 'axios'

export async function getWeather(cityName: string) {
  const response: AxiosResponse = await server.get('', {
    params: {
      q: cityName
    }
  })
  return response.data
}
