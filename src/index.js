import { TODOS_STORAGE_KEY } from "./constants";
import { createTodosModel } from "./model";
import { createStorage } from "./storage";
import { createView } from "./view";
// import {createBodyView} from "./view";

const inputNode = document.getElementById('js-input');
const inputBodyNode = document.getElementById("js-body-input");
const btnNode = document.getElementById('js-btn');
const btnClearNode = document.getElementById('js-clear-btn');
const initialTodos = []; //создание массива todos
const model = createTodosModel(initialTodos);
const view = createView('#js-output'); // Обновляем селектор, добавляя '#' для ID

const storage = createStorage(TODOS_STORAGE_KEY);

//беру данные с бд  и вывожу на странице
storage.pull().then((todos) => {
    model.update(todos);
    view.render(model.get());
 
});

btnNode.addEventListener('click',() => {
    const todo = {
        title: inputNode.value,
        body: inputBodyNode.value,
        status: 'active',

    };
    model.add(todo); //добавление в model todo
    view.render(model.get());
    storage.push(todo);
});

btnClearNode.addEventListener('click', function(){

    storage.delete(model.get());

    model.clear();
    view.render(model.get());


  
});