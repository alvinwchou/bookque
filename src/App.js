import './App.css';
import Form from './components/Form';
import ApiCall from './components/VolumeApiCall';
import BookApiCall from './components/BookApiCall';
import {useState} from "react";
import {Routes, Route} from 'react-router-dom'

function App() {
  const [userInput, setUserInput] = useState(null);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Form /> } />
        <Route path='/:search' element={<ApiCall query={userInput} />} />
      </Routes>
      
      
      {/* <BookApiCall /> */}
    </div>
  );
}

export default App;
