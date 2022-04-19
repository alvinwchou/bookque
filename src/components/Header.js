// Header.js
import logo from '../assets/bookque-transparent.png';
import Form from './Form';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="header">
            <img src={logo} alt="bookque logo" />
            <Form />
            <p>Search based on Google Books APIs</p>
            <Link to='/'>
                <p>My Library</p>
            </Link>
        </div>
    )
}