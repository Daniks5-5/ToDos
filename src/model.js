import { v4 as uuidv4 } from 'uuid';

export function createTodosModel(todos) {
    return {
        todos,
        todosById,
        addTodo: function ({ title }) { //добавляет новую todo и возвращает в storage
            const todo = {
                title,
                done: false,
                id: uuidv4()
            };
            this.todos.push(todo.id);
            this.todosById[id] = todo;
            return todo;
        },
        setTodos: function (todos) {
            this.todos = [];//массив по id
            this.todosById = {};//массив по key
            todos.forEach(todo => {
                todos.push(todo.id),
                    this.todosById[id] = todo;

            });
        },
        getTodos: function () {
            return this.todos;
        },
        getTodosById: function () {
            return this.todosById;
        },
        //переключатель при нажатии на флажок задачи
        toggleTodo: function (id) {
            this.todosById[id].done = !this.todosById[id].done

        },
        //достаём todo по id
        getTodo: function (id) {
            return this.todosById[id];
        }
    };
}