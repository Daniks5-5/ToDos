export function createView(selector) {
    const node = document.querySelector(selector);
    return {
        node,
        render: function(todos) {
            let outputListHTML = '';
            todos.forEach(function(todo) {
                outputListHTML += `<li>${todo.title}</li>`;
            });
            this.node.innerHTML = `<ul>${outputListHTML}</ul>`;
        }
    };
}