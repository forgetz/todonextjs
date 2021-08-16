import Todo from "./Todo";

function TodoList({ todos, updateTodo } ) {
   return (
      <div>
         { 
            todos?.docs.map(doc => <Todo id={doc.id} todo={doc.data()} updateTodo={updateTodo} />) 
         }
      </div>
   );
}


export default TodoList;