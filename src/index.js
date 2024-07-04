import { TODOS_STORAGE_KEY } from "./constants";
import { createTodosModel } from "./model";
import { createStorage } from "./storage";
import { createView } from "./view";

const inputNode = document.getElementById('js-input');
const btnNode = document.getElementById('js-btn');
const btnClearNode = document.getElementById('js-clear-btn');
const initialTodos = []; // Создание массива todos
const model = createTodosModel(initialTodos);
const view = createView('#js-output', handleClickTodo); // Обновляем селектор, добавляя '#' для ID
const storage = createStorage(TODOS_STORAGE_KEY);

// Беру данные с базы данных и выводим на странице
storage.pull().then((todos) => {
    model.setTodos(todos);
    view.render(model.get());
}).catch((error) => {
    console.error('An error occurred while fetching data:', error);
});

btnNode.addEventListener('click', () => {
    const todo = model.addTodo({
        title: inputNode.value,
    }); //передаю title  в model

    model.create(todo); // Добавление в модель todo
    view.addTodo(todo);
    storage.push(todo);
});

btnClearNode.addEventListener('click', function () {
    storage.delete(model.get());
    model.set([]);
    view.clear();
});

//получение id
function handleClickTodo(id) {
    model.toggleTodo(id);
    storage.update(model.getTodo(id));

}