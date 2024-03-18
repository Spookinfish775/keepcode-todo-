import { API_URLS } from "@/infrastructure/api/api.js";

export async function getTodos() {
    try {
        const params = new URLSearchParams({
            _limit: 10,
        }).toString();
        const response = await fetch(`${API_URLS.todoList}?${params}`).then(res => res.json());
        return response;
    } catch (err) {
        return err
    }
}
export async function setTodoToCompleted(todoId) {
    try {
        const params = {
            completed: true
        }
        const response = await fetch(`${API_URLS.todoList}/${todoId}`, {
            method: "PATCH",
            body: JSON.stringify(params)
        }).then(res => res.json())
        return response
    } catch (err) {
        return err
    }
}
export async function removeTodo(todoId) {
    try {
        const response = await fetch(`${API_URLS.todoList}/${todoId}`, {
            method: "DELETE",
        }).then(res => res.json())
        return response
    } catch (err) {
        return err
    }
}

export async function createTodo(todo) {
    try {
        const response = await fetch(API_URLS.todoList, {
            method: "POST",
            body: JSON.stringify(todo)
        }).then(res => res.json())
        return response
    } catch (err) {
        return err
    }
}
export async function updateTodoTitle(title, id) {
    try {
        const params = {
            title: title
        }
        const response = await fetch(`${API_URLS.todoList}/${id}`, {
            method: "PATCH",
            body: JSON.stringify(params)
        }).then(res => res.json())
        return response
    } catch (err) {
        return err
    }
}
