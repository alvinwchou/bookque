// Form.js

import { useState } from "react";
import { Link } from 'react-router-dom';
import magnifier from '../assets/magnifying-glass-solid.svg';

export default function Form({darkMode}) {
    const [form, setFrom] = useState(null);

    const handleChange = (e) => {
        setFrom(e.target.value)
    }

    return (
        <form className={darkMode && 'darkMode'}>
            <label htmlFor="userInput" className="sr-only">Search books</label>
            <input
                type="text"
                name="userInput"
                id="userInput"
                placeholder="Search Books"
                onChange={ handleChange }
                value={form}
                className={darkMode && 'darkMode'}
            />
            {/* Link decodes the url, work around for not is double encode */}
            <Link to={`/search=${encodeURIComponent(encodeURIComponent(form))}`}>
                <button className="imgContainer">
                    <img src={magnifier} alt="search button" className={darkMode && 'darkMode'}/>
                </button>
            </Link>
        </form>
    )
}