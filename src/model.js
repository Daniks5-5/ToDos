export function createTodosModel(todos){
    return{
        todos,
        update:function(todos){
            this.todos = todos;
        },
        add: function(todo){
            this.todo.push(todo);
        },
        get: function(){
            return this.todos;
        },
        clear: function(){
            this.todos = []; 
        }
    };
}