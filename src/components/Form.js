// Form.js

import { useState } from "react"
import { Link } from 'react-router-dom';

export default function Form(props) {
    const [form, setFrom] = useState(null);
    const handleChange = (e) => {
        setFrom(e.target.value)
    }

    const handleSubmit = (e) => {
        props.handleSubmit(e, form);
        setFrom('')
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userInput">Search books</label>
                <input
                    type="text"
                    name="userInput"
                    id="userInput"
                    placeholder="Search Books"
                    onChange={ handleChange }
                    value={form}
                />
                <button>Search</button>
            </form>
        </div>
    )
}