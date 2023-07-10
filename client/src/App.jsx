import { useEffect, useState } from "react";


const API_URL = process.env.REACT_APP_TODO_API_URL;
function App() {
  // todo list state hook
  const [todos, setTodos] = useState([]);

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

  async function toggleCompletion(id){
    /**
     * Toggles completion of clicked task
     */
    try{
      const res = await fetch(API_URL+"/todo/complete/"+id,
       { method: 'PUT'});
      const data = await res.json();
      setTodos(todos.map(todo=>{
        if(todo._id === data._id){
          todo.complete = data.complete;
        }
        return todo
      }));
    }catch(error){
      console.error(error);
      alert("An issue occured, please try again later");
    }

  }
  return (
    <div className="App">
      <h1> Hello, Welcome!</h1>
      <h4> Your tasks</h4>
      <div className="todos">
        {todos.map((todo) => {
          return (
            <div key={todo._id} 
            className={`todo + ${todo.complete?'is-complete':''}`}
            onClick={()=>toggleCompletion(todo._id)}>
              <div className="checkbox"></div>

              <div className="text">{todo.text}</div>

              <div className="delete-todo">x</div>
            </div>
          );
        })}
      </div>
        <div className="todo add-todo">
          <div className="add-icon">+</div>
          <div className="text">
            Add new task.
          </div>
        </div>
    </div>
  );
}

export default App;
