import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/header";
import AddTodo from "../containers/addTodo";
import TodoList from "../containers/todoList";
import fetch from "node-fetch";

export default function Home() {

  const [todos, setTodos] = useState([]);
  const getResult = async() =>{
    const result = await fetch('http://localhost:1337/api/to-dos', { method: 'GET'});
    const  res = await result.json();
    console.log("fetch",res);

    // const result2 = await axios.get("http://localhost:1337/api/to-dos");
    // console.log("axios",result2)
    setTodos(res?.data);
    // console.log(todos)
  }
  useEffect( () => {
    getResult();
  }, []);

  const addTodo = async (todoText) => {
    console.log(todoText);
    if (todoText.length > 0) {
      const result = await fetch('http://localhost:1337/api/to-dos', { 
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "data": {
            "ToDoText": todoText
          }
        })
      })
      .then(response => { console.log(response);
      });
    }
    else null;
    getResult();
  };

  const deleteTodoItem = async (todo) => {
    if (confirm("Do you really want to delete this item?")) {
      console.log('todo id: ',todo.id);
      fetch('http://localhost:1337/api/to-dos/' + todo.id, {
        method: 'DELETE',
      })
      .then(res => res.json())
      .then(res => console.log(res))
      const newTodos = todos.filter((_todo) => _todo.id !== todo.id);
      console.log('newtodo: ',newTodos);
      setTodos(newTodos);
    }
  };

  const editTodoItem = async (todo) => {
    console.log("todo: ", todo);
    const newTodoText = prompt("Enter new todo text or description:");
    console.log('newtext: ', newTodoText);
    if (newTodoText != null) {
      const result = await fetch(`http://localhost:1337/api/to-dos/${todo.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "data": {
            "ToDoText": newTodoText
          }
        }),
      })
      .then(response => { console.log(response);
      });
    }
    else null;
    getResult();
  };

  return (
    <div>
      <Head>
        <title>ToDo app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="main">
        <AddTodo addTodo={addTodo} />
        <TodoList
          todos={todos}
          deleteTodoItem={deleteTodoItem}
          editTodoItem={editTodoItem}
        />
      </main>
    </div>
  );
}
