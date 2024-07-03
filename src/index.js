import { TODOS_STORAGE_KEY } from "./constants";
import { createTodosModel } from "./model";
import { createStorage } from "./storage";
import { createView } from "./view";

const inputNode = document.getElementById('js-input');
const inputBodyNode = document.getElementById('js-body-input');
const btnNode = document.getElementById('js-btn');
const btnClearNode = document.getElementById('js-clear-btn');
const initialTodos = []; // Создание массива todos
const model = createTodosModel(initialTodos);
const view = createView('#js-output'); // Обновляем селектор, добавляя '#' для ID
const storage = createStorage(TODOS_STORAGE_KEY);

// Беру данные с базы данных и выводим на странице
storage.pull().then((todos) => {
    model.update(todos);
    view.render(model.get());
}).catch((error) => {
    console.error('An error occurred while fetching data:', error);
});

btnNode.addEventListener('click', () => {
    const todo = {
        title: inputNode.value,
        body: inputBodyNode.value,
        status: 'active',
    };
    model.add(todo); // Добавление в модель todo
    view.render(model.get());
    storage.push(todo);
});

btnClearNode.addEventListener('click', function(){
    storage.delete(model.get());
    model.clear();
    view.render(model.get());
});