<template>
  <div class="todo_list_wrapper">
    <div class="todo_list_header">
      <TodoListInput @addedNewTodo="loadItems" />
      <TodoListFilter @statusChanged="changeFilter" />
    </div>
    <Transition name="fade">
      <AppLoader v-if="!loaded" />
    </Transition>
    <Transition name="fade">
      <div v-if="loaded" class="todo_list_items_wrapper">
        <TodoListItems :items="activeListData" v-if="showActive" />
        <TodoListItems :items="completedListData" v-if="showCompleted" />
      </div>
    </Transition>
  </div>
</template>

<script>
import { getTodos } from "@/infrastructure/api/requests.js";
import { LocalStorageService } from "@/infrastructure/services/localstorage";
import { TASK_STATUS } from "@/infrastructure/constants/task-status.js";

import TodoListInput from "@/components/TodoList/Input.vue";
import TodoListFilter from "@/components/TodoList/Filter.vue";
import TodoListItems from "@/components/TodoList/ListItems.vue";
import AppLoader from "@/components/Common/Loader.vue";

export default {
  name: "TodoList",
  components: {
    TodoListInput,
    TodoListFilter,
    TodoListItems,
    AppLoader,
  },
  data() {
    return {
      loaded: false,
      items: [],
      showActive: true,
      showCompleted: true,
    };
  },
  watch: {},
  computed: {
    activeListData() {
      return this.items.filter((item) => !item.completed && !item.deleted);
    },
    completedListData() {
      return this.items.filter((item) => item.completed && !item.deleted);
    },
  },
  methods: {
    async loadItems() {
      this.loaded = false;
      const localItems = LocalStorageService.getTodos();
      if (localItems && localItems.length) {
        await new Promise((res) => {
          this.items = localItems;
          setTimeout(() => {
            res();
          }, 100);
        });
      } else {
        const items = await getTodos();
        LocalStorageService.setTodos(
          items.map((item) => ({
            ...item,
            deleted: false,
          }))
        );
        this.items = items;
      }
      this.loaded = true;
    },
    changeFilter(item) {
      this.showActive = item.status === TASK_STATUS.notCompleted;
      this.showCompleted = item.status === TASK_STATUS.completed;
      if (!this.showActive && !this.showCompleted) {
        this.showActive = true;
        this.showCompleted = true;
      }
      this.loadItems();
    },
  },
  mounted() {
    this.loadItems();
  },
};
</script>

<style lang="scss" scoped>
.todo_list_wrapper {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 120px 0 0 0;
  .todo_list_header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    @include max(760px) {
      flex-direction: column;
    }
  }
  .todo_list_items_wrapper {
    margin: 40px 0 0 0;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 16px;
    @include max(760px) {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>