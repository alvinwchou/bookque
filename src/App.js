import './App.css';
import Form from './components/Form';
import ApiCall from './components/VolumeApiCall';
import BookApiCall from './components/BookApiCall';
import {useState} from "react";
import {Routes, Route} from 'react-router-dom'

function App() {
  const [userInput, setUserInput] = useState(null);

  const getUserInput = (e, input) => {
    e.preventDefault();
    setUserInput(input)
  };

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Form handleSubmit={getUserInput} /> } />
      </Routes>
      
      <ApiCall query={ userInput }/>
      <BookApiCall />
    </div>
  );
}

export default App;
