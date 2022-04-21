// Header.js
import Form from './Form';
import { Link } from 'react-router-dom';
import logo from '../assets/bookque-transparent.png';
import library from '../assets/book-bookmark-solid.svg';

export default function Header() {
    return (
        <div className="header">
            <Link to='/'>
                <img src={logo} alt="bookque logo" />
            </Link>
            <Form />
            <Link to='/'>
                <img src={library} alt="My library button" />
            </Link>
        </div>
    )
}