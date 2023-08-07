<template>
  <teleport to="body">
    <transition name="fade">
      <div v-show="show" class="modal" :class="{ modal_open: show }">
        <div @click="close" class="modal__backdrop" />
        <div class="modal__dialog">
          <div class="modal__header">
            <slot name="header" />
            <button @click="close" type="button" class="modal__close">
              <img src="@/assets/img/icons/close.svg" alt="" />
            </button>
          </div>

          <div class="modal__body">
            <slot name="body" />
          </div>

          <div class="modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, watch } from 'vue'

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['closeModal'],
  setup(props, { emit }) {
    watch(
      () => props.show,
      () => {
        if (props.show) {
          document.documentElement.classList.add('lock')
        } else {
          document.documentElement.classList.remove('lock')
        }
      }
    )

    const close = () => {
      emit('closeModal', false)
    }

    const closeOnEscape = (e) => {
      if (e.key === 'Escape' && props.show) {
        close()
      }
    }

    onMounted(() => document.addEventListener('keydown', closeOnEscape))

    onUnmounted(() => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = null
    })

    return { close }
  }
})
</script>

<style lang="scss" scoped>
.modal {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  &__backdrop {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
  &__dialog {
    background-color: #ffffff;
    position: relative;
    width: 100%;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    z-index: 2;
    @media (min-width: 768.98px) {
      width: 90%;
    }
    @media screen and (min-width: 992.98px) {
      width: 600px;
    }
    @media (max-width: 768.98px) {
      position: absolute;
      bottom: -100%;
      margin: 0;
      z-index: 99;

      .modal_open & {
        bottom: 0;
      }
    }
  }
  &__close {
    background-color: #ffff;
    img {
      width: 24px;
      height: 24px;
    }
  }
  &__header {
    padding: 20px 20px 10px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  &__body {
    padding: 10px 20px 10px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  &__footer {
    padding: 10px 20px 20px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
