<template>
  <li class="weather__item weather-item">
    <div class="weather-item__header">
      <div>{{ weather.name }}</div>
      <div class="weather-item__image">
        <img
          :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
          alt="weather image"
        />
        <div class="weather-item__temp">
          {{ Math.round(weather.main.temp) }}&deg;C
        </div>
      </div>
    </div>
    <div class="weather-item__body">
      <div class="weather-item__text">
        <!-- Feels like -3C. Broken clouds. Light breeze -->
        Feels like {{ Math.round(weather.main.feels_like) }}&deg;C.
        {{ weather.weather[0].description }}.
      </div>
      <div class="weather-item__info">
        <span>
          <img src="@/assets/img/icons/wind-speed.svg" alt="" />
          {{ formatWind(weather.wind.speed, weather.wind.deg) }}
        </span>
        <span>
          <img src="@/assets/img/icons/barometr.svg" alt="" />
          {{ weather.main.pressure }}hPa
        </span>
      </div>
    </div>
    <div class="weather-item__footer">
      <span>Humidity: {{ weather.main.humidity }}%</span>
      <span
        >Dew point:
        {{
          calculateDewPoint(weather.main.temp, weather.main.humidity)
        }}°C</span
      >
      <span>Visibility: {{ weather.visibility / 1000.0 }}km</span>
    </div>
  </li>
</template>

<script lang="ts">
export default {
  props: { weather: Object },
  setup() {
    const formatWind = (speed: number, deg: number) => {
      const roundedSpeed = speed.toFixed(1)
      const direction = getWindDirection(deg)
      return `${roundedSpeed} m/s ${direction}`
    }

    const getWindDirection = (deg: number) => {
      if (deg >= 337.5 || deg < 22.5) {
        return 'N'
      } else if (deg >= 22.5 && deg < 67.5) {
        return 'NE'
      } else if (deg >= 67.5 && deg < 112.5) {
        return 'E'
      } else if (deg >= 112.5 && deg < 157.5) {
        return 'SE'
      } else if (deg >= 157.5 && deg < 202.5) {
        return 'S'
      } else if (deg >= 202.5 && deg < 247.5) {
        return 'SW'
      } else if (deg >= 247.5 && deg < 292.5) {
        return 'W'
      } else if (deg >= 292.5 && deg < 337.5) {
        return 'NW'
      }
    }

    const calculateDewPoint = (temp: number, humidity: number) => {
      const dewTemp = temp - (100 - humidity) / 5
      return dewTemp.toFixed(1)
    }

    return { formatWind, getWindDirection, calculateDewPoint }
  }
}
</script>

<style lang="scss" scoped>
.weather-item {
  padding: 18px;
  display: grid;
  justify-content: center;
  row-gap: 16px;
  background-color: #ffff;
  border: 1px solid #eff0f2;

  &__image {
    display: flex;
    align-items: center;
    gap: 30px;
    img {
      display: block;
      width: 100px;
      height: 100px;
    }
  }

  &__temp {
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
  }

  &__text {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  &__info {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 16px;
    span {
      display: flex;
      align-items: center;
      column-gap: 4px;

      img {
        width: 18px;
        height: 18px;
      }
    }
  }

  &__footer {
    font-size: 14px;
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }
}
</style>
