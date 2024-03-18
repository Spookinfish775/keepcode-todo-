<template>
  <div class="app_header">
    <h1 class="header_title">TODO list for</h1>
    <LogoIcon />
  </div>
</template>

<script>
import LogoIcon from "@/components/Icons/Logo.vue";

export default {
  name: "AppHeader",
  components: {
    LogoIcon,
  },
};
</script>

<style lang="scss" scoped>
.app_header {
  width: 100%;
  height: 80px !important;
  background-color: $colorBrown;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: fixed;
  z-index: 100;
  box-shadow: -1px 10px 20px -12px rgba(255, 141, 72, 0.75);
  -webkit-box-shadow: -1px 10px 20px -12px rgba(255, 141, 72, 0.75);
  -moz-box-shadow: -1px 10px 20px -12px rgba(255, 141, 72, 0.75);
  border-radius: 0 0 12px 12px;
  .header_title {
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif !important;
    font-size: 18px;
    color: $colorOrangeLight;
  }
  .logo_icon {
    margin: 6px 0 0 0;
  }
}
</style>