<template>
  <li class="todo_list_item" :class="{ _completed: itemData.completed }">
    <textarea
      class="todo_list_item_textarea"
      :name="itemData.id"
      :id="itemData.id"
      v-model="title"
      :disabled="!isEditing"
      :ref="`itemTextarea${itemData.id}`"
    ></textarea>

    <div class="todo_list_item_setting_buttons" v-if="isEditing">
      <button
        class="todo_list_item_button _complete"
        @click="confirmUpdateTodo"
      >
        <CompletedIcon />
      </button>
    </div>
    <div class="todo_list_item_setting_buttons" v-else>
      <button
        class="todo_list_item_button _complete"
        v-if="!itemData.completed"
        @click="setToCompleted"
      >
        <CompletedIcon />
      </button>
      <button
        class="todo_list_item_button"
        v-if="!itemData.completed"
        @click="editTodo"
      >
        <EditIcon />
      </button>
      <button class="todo_list_item_button _delete" @click="removeTodo">
        <DeleteIcon />
      </button>
    </div>
  </li>
</template>

<script>
import {
  setTodoToCompleted,
  removeTodo,
  updateTodoTitle,
} from "@/infrastructure/api/requests.js";
import { LocalStorageService } from "@/infrastructure/services/localstorage";

import DeleteIcon from "@/components/Icons/Delete.vue";
import CompletedIcon from "@/components/Icons/Сompleted.vue";
import EditIcon from "@/components/Icons/Edit.vue";

export default {
  name: "TodoListItem",
  components: {
    DeleteIcon,
    CompletedIcon,
    EditIcon,
  },
  props: {
    itemData: {
      requred: true,
    },
  },
  data() {
    return {
      data: this.itemData,
      title: this.itemData.title,
      isEditing: false,
    };
  },
  methods: {
    async removeTodo() {
      await removeTodo(this.itemData.id).then(() => {
        this.data.deleted = true;
        LocalStorageService.removeTodo(this.data.id);
      });
    },
    async setToCompleted() {
      await setTodoToCompleted(this.itemData.id).then(() => {
        this.data.completed = true;
        LocalStorageService.updateTodo(this.data);
      });
    },
    editTodo() {
      this.isEditing = true;
      setTimeout(() => {
        this.$refs[`itemTextarea${this.itemData.id}`].focus();
      }, 10);
    },
    async confirmUpdateTodo() {
      this.data.title = this.title;
      await updateTodoTitle(this.title, this.data.id).then(() => {
        LocalStorageService.updateTodo(this.data);
        this.isEditing = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.todo_list_item {
  max-width: 400px;
  width: 100%;
  padding: 10px;
  border: 1px solid $colorOrangeLight;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  position: relative;
  transition: 0.3s;
  .todo_list_item_textarea {
    width: 100%;
    background-color: transparent;
    border: none;
    resize: none;
    color: $colorOrangeLight;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .todo_list_item_setting_buttons {
    display: flex;
    gap: 4px;
    .todo_list_item_button {
      width: 24px;
      height: 24px;
      cursor: pointer;
      border: 1px solid $colorOrangeLight;
      .delete_icon {
        margin: 4px 0 0 0;
      }
      &:hover {
        transform: scale(1.06);
      }
    }
    ._complete {
      border: 1px solid $colorGreenSuccess;
    }
    ._delete {
      border: 1px solid $colorRedError;
    }
  }
}
._completed {
  border: 1px solid $colorViolet;
}
</style>