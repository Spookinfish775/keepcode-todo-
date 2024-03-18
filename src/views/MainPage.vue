<template>
  <div class="main_page _container">
    <TodoList />
  </div>
</template>

<script>
import TodoList from "@/components/TodoList/index.vue";

export default {
  name: "MainPage",
  components: {
    TodoList,
  },
};
</script>

<style lang="scss" scoped>
.main_page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>


