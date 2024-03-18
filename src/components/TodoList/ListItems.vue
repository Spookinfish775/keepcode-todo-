<template>
  <ul class="todo_list_items">
    <TodoListItem
      v-for="item in items"
      :key="`${item.id}-${item.title}`"
      :itemData="item"
    />
  </ul>
</template>

<script>
import DeleteIcon from "@/components/Icons/Delete.vue";
import TodoListItem from "@/components/TodoList/ListItem.vue";

export default {
  name: "TodoListItems",
  components: {
    TodoListItem,
    DeleteIcon,
  },
  props: {
    items: {
      default: [],
    },
  },
};
</script>

<style lang="scss" scoped>
.todo_list_items {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  max-width: 400px;
  width: 100%;
}
</style>