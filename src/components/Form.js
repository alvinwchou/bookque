// Form.js

import { useState } from "react"
import { Link } from 'react-router-dom';

export default function Form() {
    const [form, setFrom] = useState(null);

    const handleChange = (e) => {
        setFrom(e.target.value)
    }

    return (
        <div>
            <form>
                <label htmlFor="userInput">Search books</label>
                <input
                    type="text"
                    name="userInput"
                    id="userInput"
                    placeholder="Search Books"
                    onChange={ handleChange }
                    value={form}
                />
                <p>form state: {form}</p>
                {/* Link decodes the url, work around for not is double encode */}
                <Link to={`/search=${encodeURIComponent(encodeURIComponent(form))}`}>
                    <button>Link</button>
                </Link>
            </form>
        </div>
    )
}