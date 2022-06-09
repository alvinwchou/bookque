import './App.css';
import Landing from './components/Landing';
import VolumeApiCall from './components/VolumeApiCall';
import BookApiCall from './components/BookApiCall';
import {Routes, Route} from 'react-router-dom'
import MyLibrary from './components/MyLibrary';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    console.log('toggle darkmode')
    setDarkMode(!darkMode)
  }

  return (
    <div className={`App ${darkMode && 'darkModeBase'}`}>
      
      <Routes>
        <Route path='/' element={ <Landing darkMode = {darkMode}/> } />
        <Route path='/search=:title' element={<VolumeApiCall />} />
        <Route path='/book=:bookId' element={<BookApiCall />} />
        <Route path='/myLibrary' element={<MyLibrary/>} />
      </Routes>

      <Footer toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
    </div>
  );
}

export default App;