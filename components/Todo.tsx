import { Button, Row, Col } from 'antd';

function Todo({id, todo , updateTodo, deleteTodo}) {

   return(
      <Row>
         <span>{todo.todo}, {todo.finished ? "ok" : "no"}, { new Date(todo.createdAt.seconds * 1000).toLocaleDateString()}</span> 
         &nbsp;
         <span><Button onClick={ ()=> updateTodo(id, true) }>Todo True</Button></span>
         &nbsp;
         <span><Button onClick={ ()=> updateTodo(id, false) }>Todo False</Button></span>
         &nbsp;
         <span><Button onClick={ ()=> deleteTodo(id) }>Delete</Button></span>
      </Row>
   );
}

export default Todo;