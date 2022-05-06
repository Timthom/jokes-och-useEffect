import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [jokes, setJokes] = useState([]);
  const [selectedJoke, setSelectedJoke] = useState({});

  useEffect(() => {
    async function getJokes() {
      const response = await fetch('https://karljoke.herokuapp.com/jokes/ten');
      const data = await response.json();

      console.log(data);
      setJokes(data);
    }

    getJokes();
  }, []);

  function randomJoke() {
    const index = Math.floor(Math.random() * jokes.length);
    const joke = jokes[index];
    
    setSelectedJoke(joke);
  }

  useEffect(() => {
    randomJoke();
  }, [jokes])

  return (
    <div className="App">
      <h1>Give me a joke!</h1>
      { selectedJoke ? 
      <article>  
        <p>{ selectedJoke.setup }</p>
        <p>{ selectedJoke.punchline }</p>
      </article> : 
      <p>Slumpar ett skämt</p>
      }

      <button onClick={ randomJoke }>Slumpa ett nytt skämt</button>
    </div>
  );
}

export default App;
