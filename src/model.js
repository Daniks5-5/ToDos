import {v4 as uuidv4} from 'uuid';

export function createTodosModel(todos){
    return{
        todos,
        update:function(todos){
            this.todos = todos;
        },
        create: function({title}){ //добавляет новую todo и воззвращает
            const todo = {
                title,
                done:false,
                id: uuidv4()
            };
            this.todos.push(todo);
            return todo;
        },
        get: function(){
            return this.todos;
        },
        clear: function(){
            this.todos = []; 
        }
    };
}