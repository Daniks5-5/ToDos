import { v4 as uuidv4 } from 'uuid';

export function createTodosModel(todos) {
    return {
        todosIds: [],
        todosById: {},
        addTodo: function ({ title }) { //добавляет новую todo и возвращает в storage
            const todo = {
                title,
                done: false,
                id: uuidv4()
            };
            this.todosIds.push(todo.id);
            this.todosById[todo.id] = todo;
            return todo;
        },
        //задаем список todo
        setTodos: function (todos) {
            this.todosIds = [];//массив по id
            this.todosById = {};//массив по key
            todos.forEach(todo => {
                todos.push(todo.id),
                    this.todosIds.push(todo.id),
                    this.todosById[todo.id] = todo;


            });
        },
        //получение списка
        getTodos: function () {
            return {
                todosById: this.todosById,
                todosIds: this.todosIds,

            };
        },
        //переключатель при нажатии на флажок задачи(переключение todo)
        toggleTodo: function (id) {
            this.todosById[id].done = !this.todosById[id].done

        },
        //достаём todo по id
        getTodo: function (id) {
            return this.todosById[id];
        }
    };
}