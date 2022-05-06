import './App.css';
import { useState, useEffect } from 'react';

import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTodos() {
      const response = await fetch('https://awesome-todo-api.herokuapp.com/tasks');
      const data = await response.json();

      console.log(data);
      setTodos(data.todos);
    }

    getTodos();
  }, []); // [] betyder att denna useEffect enbart körs en gång och inte mer

  useEffect(() => {
    console.log('State har uppdaterats: ', todos);
  }); // Denna useEffect körs varje gång något state har uppdaterats

  useEffect(() => {
    console.log('Todos state har uppdateras');
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Ger illusionen av laddningstid
  }, [todos]); // Denna useEffect körs varje gång state todos uppdateras

  const todoComponents = todos.map((todo) => {
    if (todo.task) {
      return <TodoItem task={ todo.task } key={ todo.id } />
    }
  })

  return (
    <div className="App">
      { /** Nedan säger om loading är true så visa p-taggen annars visa todoComponents */}
      { loading ? <p>Laddar todos</p> : 
        <ul>
          { todoComponents }
        </ul>
      }
    </div>
  );
}

export default App;
