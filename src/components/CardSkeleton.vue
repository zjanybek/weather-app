<template>
  <div class="skeleton-card">
    <div class="skeleton-card-item">
      <div class="skeleton-card-item__image">
        <div class="skeleton skeleton-image"></div>
      </div>
      <div class="skeleton-card-item__content">
        <div class="skeleton-card-item__title">
          <div class="skeleton skeleton-text"></div>
        </div>
        <div class="skeleton-card-item__text">
          <div class="skeleton skeleton-text"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.skeleton {
  opacity: 0.7;
  animation: skeleton-loading 1s linear infinite alternate;
}

.skeleton-text {
  width: 100%;
  height: 1rem;
  border-radius: 0.125rem;
}

.skeleton-item {
  width: 63px;
  height: 1rem;
  border-radius: 0.125rem;
}

.skeleton-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.skeleton-logo {
  position: absolute;
  left: 8px;
  bottom: -30px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
}

.skeleton-add {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 100%;
  overflow: hidden;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(210, 2%, 22%);
  }

  100% {
    background-color: hsl(210, 2%, 50%);
  }
}

.skeleton-card-item {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  &__image {
    position: relative;
    padding-bottom: 48%;
  }

  &__content {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }
}
</style>
