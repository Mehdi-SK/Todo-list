import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_TODO_API_URL;
function App() {
  // todo list state hook
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTask, setNewTask] = useState("");

  // Load all existing todos at the start of the website
  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    /**
     * Fetch all todos into a json file, then set them in the state
     */
    try {
      const res = await fetch(API_URL + "/todos");
      // console.log(res);
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function toggleCompletion(id) {
    /**
     * Toggles completion of clicked task
     */
    try {
      const res = await fetch(API_URL + "/todo/complete/" + id, {
        method: "PUT",
      });
      const data = await res.json();
      setTodos(
        todos.map((todo) => {
          if (todo._id === data._id) {
            todo.complete = data.complete;
          }
          return todo;
        })
      );
    } catch (error) {
      console.error(error);
      alert("An issue occured, please try again later");
    }
  }

  async function deleteTodo(id) {
    try {
      const res = await fetch(API_URL + "/todo/delete/" + id, {
        method: "DELETE",
      });
      const deletedTask = await res.json();
      setTodos(todos.filter((todo) => todo._id !== deletedTask._id));
      return deletedTask;
    } catch (error) {
      console.error(error);
      alert("An error occured when deleting the task. Please try again later.");
    }
  }

  async function addTodo(){
    try {
      if(newTask !== ''){
        const res = await fetch(API_URL+"/todo/new", {
          method: "POST",
          headers:{
            "Content-Type":'application/json'
          },
          body: JSON.stringify({
            "text": newTask
          })
        });
        const data = await res.json();
        setTodos([...todos, data]);
    
        setPopupActive(false);
        setNewTask("");
      }else{
        alert("Task field cannot be empty")
      }
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <div className="App">
      <h1> Hello, Welcome!</h1>
      <h4> Your tasks</h4>
      <div className="todos">
        {todos.map((todo) => {
          return (
            <div
              key={todo._id}
              className={`todo + ${todo.complete ? "is-complete" : ""}`}
            >
              <div
                className="checkbox"
                onClick={() => toggleCompletion(todo._id)}
              ></div>

              <div className="text">{todo.text}</div>

              <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
                x
              </div>
            </div>
          );
        })}
      </div>
      <div className="todo add-todo" onClick={() => setPopupActive(true)}>
        <div className="add-icon">+</div>
        <div className="text">Add new task.</div>
      </div>
      {popupActive ? (
        <div className="add-task-popup">
          <div className="close-popup" onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className="content">
            <h3>Add todo:</h3>
            <input
              type="text"
              className="new-task-input"
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              onKeyDown={e=>{
                if (e.key==='Enter'){
                  addTodo();
                }
              }}
            />
            <button className="create-task-button" onClick={()=>addTodo()} >Create todo</button>
          </div>

        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
