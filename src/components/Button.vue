<template>
  <button :type="type" class="button">
    <slot />
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'button'
    }
  }
})
</script>

<style lang="scss" scoped>
.button {
  padding: 9px 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #3e4956;
  border: 1px solid #e4e9ef;
  background-color: #ffff;

  // margin-bottom: 24px;

  // img {
  //   width: 24px;
  //   height: 24px;
  // }

  @media (any-hover: hover) {
    &:hover {
      border-color: #c4cfdc;
    }
  }
}
</style>
