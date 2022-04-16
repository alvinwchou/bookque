import './App.css';
import Form from './components/Form';
import VolumeApiCall from './components/VolumeApiCall';
import BookApiCall from './components/BookApiCall';
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Form /> } />
        <Route path='/search=:title' element={<VolumeApiCall />} />
        <Route path='/book=:bookId' element={<BookApiCall />} />
      </Routes>

    </div>
  );
}

export default App;
