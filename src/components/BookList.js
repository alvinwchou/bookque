// BookList.js
import { Link } from "react-router-dom"

export default function BookList({ book, label }) {

    const handleClick = (e) => {
        console.log(e.target.value);
        console.log(e);
        console.log(label);
        // props.handleOption()
    }
    return (
        <li className="bookList">
            <div className="options">
                <p className="addBlue">&#x25BC;</p>
                <ul className="optionsDropdown">
                    {label === 'toRead'
                        ? null
                        : <li><button value="toRead" onClick={handleClick}>Move to read</button></li>
                    }
                    {label === 'fav'
                        ? null
                        : <li><button value="fav" onClick={handleClick}>Move to favourites</button></li>
                    }
                    {label === 'haveRead'
                        ? null
                        : <li><button value="haveRead" onClick={handleClick}>Move to have read</button></li>
                    }
                    <li><button value="remove" onClick={handleClick}>Remove</button></li>
                </ul>
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