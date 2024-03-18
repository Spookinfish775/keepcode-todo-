<template>
  <div class="todo_list_filter_wrapper" v-click-outside="closeList">
    <div class="todo_list_filter_selector" @click="expandList">
      <span
        class="todo_list_filter_selector_current_status"
        v-if="selectedStatus"
      >
        {{ selectedStatus.title }}
      </span>
      <span class="_placeholder" v-else> Выберите тип задачи... </span>
      <ExpandArrowIcon />
    </div>
    <Transition name="slide-fade">
      <ul class="todo_list_filter_list" v-if="listExpanded">
        <li
          v-for="item in taskStatuses"
          :key="item.id"
          class="todo_list_filter_list_item"
          @click="setFilter(item)"
        >
          {{ item.title }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script>
import { TASK_STATUSES } from "@/infrastructure/data-sources/task-statuses.js";

import ExpandArrowIcon from "@/components/Icons/ExpandArrow.vue";

export default {
  name: "TodoListFilter",
  components: {
    ExpandArrowIcon,
  },
  data() {
    return {
      listExpanded: false,
      selectedStatus: null,
    };
  },
  computed: {
    taskStatuses() {
      return TASK_STATUSES;
    },
  },
  methods: {
    expandList() {
      this.listExpanded ^= true;
    },
    closeList() {
      this.listExpanded = false;
    },
    setFilter(item) {
      this.selectedStatus = item;
      this.listExpanded = false;
      this.$emit("statusChanged", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.todo_list_filter_wrapper {
  min-width: 180px;
  max-width: 300px;
  width: 100%;
  position: relative;
  .todo_list_filter_selector {
    width: 100%;
    height: 52px;
    padding: 10px;
    border: 1px solid $colorOrangeLight;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    .todo_list_filter_selector_current_status {
      font-size: 14px;
      line-height: 32px;
    }
    .expand_arrow_icon {
      margin: 4px 0 0 0;
    }
  }
  .todo_list_filter_list {
    position: absolute;
    top: 114%;
    width: 100%;
    height: 100px;
    border: 1px solid $colorOrangeLight;
    border-radius: 8px;
    background-color: $colorAlmostBlack;
    z-index: 10;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .todo_list_filter_list_item {
      color: $colorOrangeLight;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        transform: translate(2px, 0);
        color: $colorViolet;
      }
    }
  }
}
</style>