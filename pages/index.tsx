import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import firebase from "../firebase/clientApp";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import Auth from "../components/Auth";
import TodoList from "../components/TodoList";

export default function Home() {
  
  // db
  const db = firebase.firestore();

  // user auth
  const [user, loading, error] = useAuthState(firebase.auth());
  console.log("Loading:", loading, "|", "Current user:", user);

  // get todos
  const [todos, todosLoading, todosError] = useCollection(firebase.firestore().collection("todos"), {});
  if (!todosLoading && todos) {
    todos.docs.map((doc) => console.log(doc.data(), doc.id));
  }

  // function
  const addVoteDocument = async (finished: boolean) => {
    await db.collection("todos").doc("14tBDWfbgj47grvjopb3").update({
      finished: finished,
      updatedAt: new Date()
    });
  };

  const updateTodo = async (id: string, finished: boolean) => {
    await db.collection("todos").doc(id).update({
      finished: finished,
      updatedAt: new Date()
    });
  };

  const deleteTodo = async (id: string) => {
    await db.collection("todos").doc(id).delete().then(()=> {
      console.log('delete completed');
    });
  };

  const newTodo = async (todo: string) => {
    await db.collection("todos").add({
      todo: todo,
      finished: false,
      createdAt: new Date()
    });
  }

  // let props = {
  //   todos: todos,
  //   updateTodo: updateTodo
  // }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gridGap: 8,
        background:
          "linear-gradient(180deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
      }}
    >
      {loading && <h4>Loading...</h4>}
      {!user && <Auth />}
      {user && (
        <>
          <h1>Todo list</h1>
          <TodoList todos={todos} newTodo={newTodo} updateTodo={updateTodo} deleteTodo={deleteTodo} />

          <div style={{ flexDirection: "row", display: "flex" }}>
            <button
              style={{ fontSize: 32, marginRight: 8 }}
              onClick={() => addVoteDocument(true)}
            >
              ✔️🍍🍕
            </button>
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <button
              style={{ fontSize: 32, marginRight: 8 }}
              onClick={() => addVoteDocument(false)}
            >
              ❌🍍🍕
            </button>
          </div>
        </>
      )}
    </div>
  );

}
