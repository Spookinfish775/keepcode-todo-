const todosKey = 'todos'

export class LocalStorageService {
    static getTodos() {
        let items = localStorage.getItem(todosKey)
        if (items) {
            items = JSON.parse(items)
        }
        return items
    }

    static setTodos(todos) {
        localStorage.setItem(todosKey, JSON.stringify(todos))
    }

    static addTodo(todo) {
        const items = this.getTodos()
        if (!items) {
            items = []
        }
        items.push(todo)
        this.setTodos(items)
    }

    static updateTodo(todo) {
        const items = this.getTodos()
        if (!items) return;

        const index = items.findIndex((item) => item.id === todo.id);


        if (index !== -1) {
            items[index] = todo;
        }

        this.setTodos(items)
    }

    static removeTodo(id) {
        const items = this.getTodos()
        if (!items) return;

        const index = items.findIndex((item) => item.id === id);

        if (index !== -1) {
            items.splice(index, 1);
        }

        this.setTodos(items)
    }
}