<template>
  <div>
    <Transition name="fade">
      <div class="loader_wrapper">
        <span class="loader"></span>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: "AppLoader",
};
</script>

<style lang="scss" scoped>
.loader_wrapper {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0;
  margin: 40px 0 0 0;
  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid $colorBrown;
    border-bottom-color: $colorOrangeLight;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>