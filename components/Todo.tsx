function Todo({id, todo , updateTodo}) {
   console.log("Todo ", id);
   return(
      <div>
         <span>{todo.todo}, {todo.finished ? "ok" : "no"}, { new Date(todo.createdAt.seconds * 1000).toLocaleDateString()}</span> 
         &nbsp;
         <span><button onClick={ ()=> updateTodo(id, true) }>Todo True</button></span>
         &nbsp;
         <span><button onClick={ ()=> updateTodo(id, false) }>Todo False</button></span>
      </div>
   );
}

export default Todo;