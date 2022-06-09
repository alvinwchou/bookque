// Footer.js

import { Link } from "react-router-dom";


export default function Footer({toggleDarkMode, darkMode}) {

    return (
        <footer>
            <p>Coded by <Link to="https://www.alvinwchou.com/" className={darkMode && 'darkModeAnchor'}>Alvin Chou</Link></p>
            <label className="switch">
                <input type="checkbox" onClick={() => toggleDarkMode()}/>
                    <span className="slider round"></span>
            </label>
        </footer>
    )
}