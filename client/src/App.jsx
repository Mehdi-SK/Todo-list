import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <div className="App">
      <h1> Hello, Welcome!</h1>
      <h4> Your tasks</h4>

      <div className="todos">
        <div className="todo">
          <div className="checkbox"></div>

          <div className="text">Clean the dishes</div>

          <div className="delete-todo">x</div>
        </div>

        <div className="todo is-complete">
          <div className="checkbox"></div>

          <div className="text">Wash the car</div>

          <div className="delete-todo">x</div>
        </div>
      </div>
    </div>
  );
}

export default App;
