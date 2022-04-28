import './App.css';
import Landing from './components/Landing';
import VolumeApiCall from './components/VolumeApiCall';
import BookApiCall from './components/BookApiCall';
import {Routes, Route} from 'react-router-dom'
import MyLibrary from './components/MyLibrary';

function App() {

  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={ <Landing /> } />
        <Route path='/search=:title' element={<VolumeApiCall />} />
        <Route path='/book=:bookId' element={<BookApiCall />} />
        <Route path='/myLibrary' element={<MyLibrary/>} />
      </Routes>

    </div>
  );
}

export default App;
