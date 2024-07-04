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

// Беру данные с backend 
storage.pull().then((todos) => {
    model.setTodos(todos); //обновляю данные
    view.renderTodos(model.getTodos()); //делаю отрисовку данных
}).catch((error) => {
    console.error('An error occurred while fetching data:', error);
});

btnNode.addEventListener('click', () => {
    //добаляем todo
    const todoTitle = inputNode.value;
    const todo = model.addTodo({
        title: todoTitle,
    }); //передаю title  в model
    view.addTodo(todo);//отображаю todo
    storage.push(todo); //сохраняю todo в бд
});
//очищаем бд и страницу
btnClearNode.addEventListener('click', function () {
    storage.delete(model.getTodos());
    model.setTodos([]); //чищу бд
    view.clearTodos(); //убераю отображение
});

//переключение флажка
function handleClickTodo(id) {
    model.toggleTodo(id); //переключаем todo в model
    storage.update(model.getTodo(id)); //обновляем

}