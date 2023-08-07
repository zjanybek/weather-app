<template>
  <div class="main-block">
    <div class="weather">
      <div class="weather__container">
        <h1 class="weather__title">Weather app</h1>
        <div class="weather-settings">
          <Button
            @click="showModal = !showModal"
            class="weather-settings__setting-btn"
          >
            <span>Weather settings</span>
            <img src="@/assets/img/icons/setting.svg" alt="Weather settings" />
          </Button>
          <Modal :show="showModal" @closeModal="showModal = false">
            <template #header>
              <div class="weather-settings__title">Weather settings</div>
            </template>
            <template #body>
              <div class="weather-settings__body">
                <draggable
                  v-model="weatherData"
                  @end="handleDragEnd"
                  tag="ul"
                  handle=".handle"
                  item-key="id"
                  class="weather-settings__items"
                >
                  <template #item="{ element }">
                    <li class="weather-settings__item">
                      <div class="handle">
                        <img src="@/assets/img/icons/menu.svg" alt="" />
                      </div>
                      <span>{{ element.name }}</span>
                      <button
                        @click="removeCity(element.id)"
                        class="weather-settings__button"
                      >
                        <img src="@/assets/img/icons/trash.svg" alt="delete" />
                      </button>
                    </li>
                  </template>
                </draggable>

                <form @submit.prevent="addCity" class="weather-form">
                  <span
                    v-if="errorMessage"
                    class="weather-form__error error-message"
                    >{{ errorMessage }}</span
                  >
                  <div class="weather-form__add">
                    <TextInput
                      v-model:modelValue="newCity"
                      placeholder="Enter city"
                    />
                    <Button :type="'submit'">
                      <img src="@/assets/img/icons/enter.svg" alt="add" />
                    </Button>
                  </div>
                </form>
              </div>
            </template>
          </Modal>
        </div>

        <div v-if="isLoading">
          <ul class="weather__items">
            <CardSkeleton v-for="(_, index) in mockData" :key="index" />
          </ul>
        </div>

        <div v-else-if="!isLoading && weatherData.length > 0">
          <ul class="weather__items">
            <Card
              v-for="weather in weatherData"
              :key="weather.id"
              :weather="weather"
            />
          </ul>
        </div>

        <div v-else-if="!isLoading && errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getWeather } from '../services/getWeather'
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localstorage'
import { IWeather } from '../types/weather'

import draggable from 'vuedraggable'
import Modal from './Modal.vue'
import TextInput from './TextInput.vue'
import Button from './Button.vue'
import Card from './Card.vue'
import CardSkeleton from './CardSkeleton.vue'

interface ICity {
  id: number
  name: string
}

export default defineComponent({
  components: { draggable, Modal, TextInput, Button, Card, CardSkeleton },
  setup() {
    const mockData = ref<undefined[]>(new Array(8))
    const newCity = ref<string>('')
    const cities = ref<ICity[]>([])
    const weatherData = ref<IWeather[]>([])

    const isLoading = ref<boolean>(false)
    const errorMessage = ref<null | string>(null)
    const showModal = ref<boolean>(false)

    onMounted(() => {
      loadCities()
      fetchWeatherDataForCities()
    })

    const loadCities = async () => {
      const savedCities = getFromLocalStorage('cities')

      if (savedCities && savedCities.length > 0) {
        cities.value = savedCities
      } else {
        const location = prompt('Please enter your city')
        const userLocation = location.trim()
        const data = await fetchWeatherData(userLocation)
        cities.value.push({ id: data.id, name: data.name.trim() })
        weatherData.value.push(data)

        saveToLocalStorage('cities', cities.value)
      }
    }

    const fetchWeatherData = async (cityName: string) => {
      try {
        return await getWeather(cityName)
      } catch (error) {
        if (error.response.data) {
          errorMessage.value = error.response.data.message
        } else {
          errorMessage.value =
            'An error occurred while processing your request. Please try again later.'
        }
        return null
      }
    }

    const fetchWeatherDataForCities = async () => {
      isLoading.value = true
      for (const city of cities.value) {
        const cityData = await fetchWeatherData(city.name)
        if (cityData) {
          weatherData.value.push(cityData)
        }
      }
      isLoading.value = false
    }

    const addCity = async () => {
      if (newCity.value.trim() !== '') {
        const cityName = newCity.value.trim()
        const cityData = await fetchWeatherData(cityName)

        if (cityData) {
          cities.value.push({ id: cityData.id, name: cityData.name.trim() })
          weatherData.value.push(cityData)
          newCity.value = ''

          showModal.value = false
          saveToLocalStorage('cities', cities.value)
        }
      }
    }

    const removeCity = (id: number) => {
      cities.value = cities.value.filter((city) => city.id !== id)
      weatherData.value = weatherData.value.filter((item) => item.id !== id)
      saveToLocalStorage('cities', cities.value)
    }

    const handleDragEnd = () => {
      cities.value = weatherData.value.map((item) => {
        return { id: item.id, name: item.name.trim() }
      })

      saveToLocalStorage('cities', cities.value)
    }

    return {
      mockData,
      newCity,
      cities,
      weatherData,
      isLoading,
      errorMessage,
      showModal,

      loadCities,
      fetchWeatherData,
      fetchWeatherDataForCities,
      addCity,
      removeCity,
      handleDragEnd
    }
  }
})
</script>

<style lang="scss" scoped>
.weather {
  padding: 48px 0;
  &__title {
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 32px;
  }
  &__items {
    display: grid;
    gap: 30px;
    @media (min-width: 540.98px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 810.98px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1080.98px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

.weather-settings {
  &__setting-btn {
    margin-bottom: 24px;
    img {
      width: 24px;
      height: 24px;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
  }

  &__items {
    height: 275px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  &__item {
    padding: 8px;
    display: flex;
    align-items: center;
    column-gap: 12px;
    background-color: #edebe9;

    span {
      flex: 1 1 auto;
    }
  }

  &__button {
    cursor: pointer;

    img {
      width: 18px;
      height: 18px;
    }
  }
}

.weather-form {
  &__error {
    margin-bottom: 16px;
  }
  &__add {
    display: flex;
    column-gap: 2px;
    input {
      flex: 1 1 auto;
    }

    button {
      img {
        width: 32px;
        height: 32px;
      }
    }
  }
}

.handle {
  cursor: pointer;

  img {
    width: 18px;
    height: 18px;
  }
}

.error-message {
  display: inline-block;
  color: rgb(239 68 68);
}
</style>
