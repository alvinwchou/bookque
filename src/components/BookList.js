// BookList.js
import { useState } from "react";
import { Link } from "react-router-dom"

export default function BookList({ book, label, handleOption, darkMode }) {
    // state for toggling dropdown class
    const [isActive, setIsActive] = useState(false)

    const handleOptionsClick = (e) => {
        console.log('BOOKLIST HANDLCLICK');
        console.log(e.target.value);
        console.log(label);
        console.log(book.id)
        handleOption(book.id, label, e.target.value)
    }

    const handleToggle = () => {
        console.log('Click', isActive);        
        setIsActive(!isActive)
    }

    return (
        <li className="bookList">
            <div className="options">
                <p className={darkMode ? 'darkModeAnchor' : 'addBlue'} onClick={handleToggle}>&#x25BC;</p>
                <ul className={`optionsDropdown ${isActive ? "showDropdown" : "hideDropdown"} ${darkMode && 'darkMode'}`}>
                    {label === 'toRead'
                        ? null
                        : <li><button value="toRead" onClick={handleOptionsClick}>Move to read</button></li>
                    }
                    {label === 'fav'
                        ? null
                        : <li><button value="fav" onClick={handleOptionsClick}>Move to favourites</button></li>
                    }
                    {label === 'haveRead'
                        ? null
                        : <li><button value="haveRead" onClick={handleOptionsClick}>Move to have read</button></li>
                    }
                    <li><button value="remove" onClick={handleOptionsClick}>Remove</button></li>
                </ul>
            </div>

            <div className="bookInfo">
                <div className="imgContainer">
                    <Link to={`/book=${book.id}`} className={darkMode && 'darkModeAnchor'}>
                        {book.image 
                            ? <img src={book.image} alt={`Book cover of ${book.title}`} />
                            : <div className="noImage">
                                <p>No image available</p>
                            </div>
                        }
                    </Link>
                </div>
                <p><Link to={`/book=${book.id}`} className={darkMode && 'darkModeAnchor'}>
                    {book.title}
                </Link></p>
                
                <p>{book.authors.map((author, index) => {
                    return (
                        index === 0
                            ? author
                            : `, ${author}`
                    )
                })}</p>
            </div>
        </li>
    )
}