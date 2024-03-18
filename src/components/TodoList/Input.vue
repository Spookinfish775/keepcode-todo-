<template>
  <div class="todo_list_input_wrapper">
    <input
      type="text"
      placeholder="Опишите задачу..."
      class="todo_list_input"
      v-model="todoContent"
    />
    <button class="add_button" @click="createNewTodo">
      <span class="_buton_placeholder">+</span>
    </button>
  </div>
</template>

<script>
import { createTodo } from "@/infrastructure/api/requests.js";
import { LocalStorageService } from "@/infrastructure/services/localstorage";

export default {
  name: "TodoListInput",
  data() {
    return {
      todoContent: "",
    };
  },
  methods: {
    async createNewTodo() {
      if (this.todoContent.length) {
        let newTodo = {
          id: Date.now(),
          completed: false,
          title: this.todoContent,
          userId: 1,
          deleted: false,
        };
        await createTodo(newTodo).then(() => {
          this.todoContent = "";
          LocalStorageService.addTodo(newTodo);
          this.$emit("addedNewTodo");
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.todo_list_input_wrapper {
  max-width: 460px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
  .todo_list_input {
    flex-grow: 1;
    min-width: 200px;
    max-width: 400px;
    height: 52px;
  }
  .add_button {
    min-width: 52px;
    width: 52px;
    height: 52px;
  }
}
</style>