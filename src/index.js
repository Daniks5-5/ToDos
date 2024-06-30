import { TODOS_STORAGE_KEY } from "./constants";
import { createTodosModel } from "./model";
import { createStorage } from "./storage";
import { createView } from "./view";

const inputNode = document.getElementById('js-input');
const btnNode = document.getElementById('js-btn');
const btnClearNode = document.getElementById('js-clear-btn');
const initialTodos = [];
const model = createTodosModel(initialTodos);
const view = createView('#js-output'); // Обновляем селектор, добавляя '#' для ID
const storage = createStorage(TODOS_STORAGE_KEY);

storage.pull().then((todos) => {
    model.update(todos);
    view.render(model.get());
});

btnNode.addEventListener('click',() => {
    const todo = {
        title: inputNode.value,
        status: 'active',
    };
    model.add(todo); //добавление в model todo
    view.render(model.get());
    storage.push(todo);
});

btnClearNode.addEventListener('click', function(){
    model.clear();
    view.render(model.get());
    storage.push(model.get());
});