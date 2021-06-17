import React, { useEffect, useState } from "react";
import "./Todolist.css";

const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [currentTodo, setCurrentTodo] = useState({});
  const [todoEditing, setTodoEditing] = useState(null);
  const [emptyTodo, setEmptyTodo] = useState(false);

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo === "") {
      setEmptyTodo(true);
    } else {
      const newTodo = {
        id: new Date().getTime(),
        text: todo,
        completed: false,
      };
      setEmptyTodo(false);
      setTodos([...todos, newTodo]);
      setTodo("");
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  function handleEditClick(id, todo) {
    setTodoEditing(id);
    setCurrentTodo({ ...todo });
  }

  const handleEditChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  };

  const submitEdits = (id, updatedTodo) => {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setTodos(updatedItem);
    setTodoEditing(null);
  };

  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setTodo(e.target.value)} value={todo} />
        <button type="submit">Add Todo</button>
        {emptyTodo ? <label>Write something!</label> : ""}
      </form>

      {todos.map((todo) => (
        <div key={todo.id}>
          {todoEditing === todo.id ? (
            <>
              <input value={currentTodo.text} onChange={handleEditChange} />
              <button onClick={() => submitEdits(currentTodo.id, currentTodo)}>
                Submit
              </button>
              <button onClick={() => setTodoEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
                <div className={`${todo.completed && "completed"}`}>
                  {todo.text}
                </div>
              </div>
              <button onClick={() => handleEditClick(todo.id, todo)}>
                Edit
              </button>
            </>
          )}
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </>
  );
};

export default Todolist;
