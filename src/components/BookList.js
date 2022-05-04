// BookList.js
import { Link } from "react-router-dom"

export default function BookList({ book, label }) {

    const handleClick = (e) => {
        console.log(e.target.value);
        console.log(label);
    }
    return (
        <li className="bookList">
            <div className="options">
                {label === 'toRead'
                    ? null
                    : <button value="toRead" onClick={handleClick}>Move to read</button>
                }
                {label === 'fav'
                    ? null
                    : <button value="fav" onClick={handleClick}>Move to favourites</button>
                }
                {label === 'haveRead'
                    ? null
                    : <button value="haveRead" onClick={handleClick}>Move to have read</button>
                }
                <button value="remove" onClick={handleClick}>Remove</button>
            </div>

            <div className="bookInfo">
                <div className="imgContainer">
                    <Link to={`/book=${book.id}`}>
                        <img src={book.image} alt={`Book cover of ${book.title}`} />
                    </Link>
                </div>
                <p><Link to={`/book=${book.id}`}>
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