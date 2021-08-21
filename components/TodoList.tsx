import { useState } from "react";
import Todo from "./Todo";
import { Button, Input, Divider, Row, Col } from "antd";

function TodoList({ todos, newTodo, updateTodo, deleteTodo } ) {

   const [query, setQuery] = useState({ todo: '' });

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(query.todo);

      newTodo(query.todo);
      
      query.todo = '';
  };

  const handleChange = () => (e) => {
      const { name, value } = e.target;
      setQuery((prevState) => ({
         ...prevState,
         'todo': value
      }));

      console.log(name, value);
  };

  const onReset = () => (e) => {
      query.todo = '';
  };

   return (
      <div>
         <form onSubmit={ handleSubmit }>
            <Row>
               <Input type="text" id="todo" placeholder="New Todo" value={ query.todo } onChange={ handleChange() } required />  
            </Row>
            <Row>
               <Button type="primary" htmlType="submit">Add</Button>
               <Button type="default" htmlType="button" onClick={ onReset() }>Clear</Button>
            </Row>
         </form>
        
         <Divider />
         { 
            todos?.docs.map(doc => <Todo id={doc.id} todo={doc.data()} updateTodo={updateTodo} deleteTodo={deleteTodo} />) 
         }
      </div>
   );
}


export default TodoList;