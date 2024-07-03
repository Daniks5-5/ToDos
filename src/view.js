export function createView(selector) {
    const node = document.querySelector(selector);
    return {
        node,
        render: function(todos) {
            let outputListHTML = '';
            todos.forEach(function(todo) {
                outputListHTML += `<div><li>${todo.title}<ul><li>${todo.body}</li></ul></li></div>`;
            });
            this.node.innerHTML = `<div><ul>${outputListHTML}</ul></div>`;
        }
    };
};

