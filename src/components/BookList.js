// BookList.js
import { Link } from "react-router-dom"

export default function BookList({ book, label, handleOption }) {

    const handleClick = (e) => {
        console.log('BOOKLIST HANDLCLICK');
        console.log(e.target.value);
        console.log(label);
        console.log(book.id)
        handleOption(book.id, label, e.target.value)
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