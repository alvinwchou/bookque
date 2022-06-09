// Header.js
import Form from './Form';
import { Link } from 'react-router-dom';
import logo from '../assets/bookque-transparent.png';
import library from '../assets/book-bookmark-solid.svg';

export default function Header({darkMode}) {
    return (
        <div className="header">
            <div className="logo">
                <Link to='/'>
                    <img className={darkMode && 'darkMode'} src={logo} alt="bookque logo" />
                </Link>
            </div>
            <Form darkMode={darkMode}/>
            <div className="libraryImgContainer">
                <Link to='/myLibrary'>
                    <img className={darkMode && 'darkMode'} src={library} alt="My library button" />
                </Link>
            </div>
        </div>
    )
}