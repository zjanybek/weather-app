<template>
  <input
    ref="input"
    class="input"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  padding: 12px;
  outline: none;
  border: 1px solid rgb(209 213 219);
  color: rgb(17 24 39);

  &:focus {
    border-color: #a4cfef;
  }
}
</style>
