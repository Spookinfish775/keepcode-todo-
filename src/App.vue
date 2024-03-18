<template>
  <div class="app_wrapper">
    <AppHeader />
    <RouterView />
  </div>
</template>

<script>
import AppHeader from "@/components/Header/index.vue";
export default {
  components: {
    AppHeader,
  },
};
</script>

