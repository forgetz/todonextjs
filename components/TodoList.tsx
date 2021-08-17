import { useState } from "react";
import Todo from "./Todo";


function TodoList({ todos, newTodo, updateTodo, deleteTodo } ) {

   const [query, setQuery] = useState({ todo: '' });

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(query.todo);

      newTodo(query.todo);
      
      query.todo = '';
  };

  const handleChange = () => (e) => {
      const todo = e.target.name;
      const value = e.target.value;
      setQuery((prevState) => ({
         ...prevState,
         'todo': value
      }));
  };

   return (
      <div>
         <form onSubmit={ handleSubmit }>
         new todo <input type="text" id="todo" value={ query.todo } onChange={ handleChange() } required /> <button type="submit"> Add </button>
         </form>
         <hr />
         { 
            todos?.docs.map(doc => <Todo id={doc.id} todo={doc.data()} updateTodo={updateTodo} deleteTodo={deleteTodo} />) 
         }
      </div>
   );
}


export default TodoList;