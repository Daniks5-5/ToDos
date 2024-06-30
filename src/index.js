import { TODOS_STORAGE_KEY } from "./constants";
import { createTodosModel } from "./model";
import { createStorage } from "./storage";
import { createView } from "./view";

const inputNode = document.getElementById('js-input');
const btnNode = document.getElementById('js-btn');
const btnClearNode = document.getElementById('js-clear-btn');
const initialTodos = [];
const model = createTodosModel(initialTodos);
const view = createView('#js-output'); // Update the selector to include '#' for ID
const storage = createStorage(TODOS_STORAGE_KEY);

storage.pull().then((todos) => {
    model.update(todos);
    view.render(model.get());
});

btnNode.addEventListener('click', function() {
    const todo = inputNode.value;
    model.add(todo);
    view.render(model.get());
});