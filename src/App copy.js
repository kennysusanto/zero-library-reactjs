import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // const [view, setView] = useState([]);
  // const addView = (newView) => setView(oldView => [oldView, ...newView]);
  const [view, setView] = useState('books');
  return (
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Current view is {view}</p>
        <div>
          <button onClick={() => setView("books")}>Books</button>
          <button onClick={() => setView("magazines")}>Magazines</button>
          <button onClick={() => setView("newspapers")}>Newspapers</button>
          {/* <button onClick={() => addView("books")}>Books</button>
          <button onClick={() => addView("magazines")}>Magazines</button>
          <button onClick={() => addView("newspapers")}>Newspapers</button> */}
        </div>
      </header>
    </div>
  );
}

export default App;
