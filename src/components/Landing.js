// Landing.js
import logo from '../assets/bookque-transparent.png';
import Form from './Form';
import { Link } from 'react-router-dom';

export default function Landing({darkMode}) {
    
    return (
        <div className='landing'>
            <img className={darkMode && 'darkMode'} src={logo} alt="bookque logo" />
            <Form darkMode={darkMode}/>
            <p>Search based on Google Books APIs</p>
            <Link to='/myLibrary' className={darkMode && 'darkModeAnchor'}>
                <p>My Library</p>
            </Link>
        </div>
    )
}