<template>
  <div>
    <WeatherContainer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WeatherContainer from './components/WeatherContainer.vue'

export default defineComponent({
  components: { WeatherContainer }
})
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
