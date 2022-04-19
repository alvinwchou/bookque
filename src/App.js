import './App.css';
import Header from './components/Header';
import VolumeApiCall from './components/VolumeApiCall';
import BookApiCall from './components/BookApiCall';
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={ <Header /> } />
        <Route path='/search=:title' element={<VolumeApiCall />} />
        <Route path='/book=:bookId' element={<BookApiCall />} />
      </Routes>

    </div>
  );
}

export default App;
