// BookList.js

export default function BookList({ book }) {
    return (
        <li key={book.id} className="bookCard">
            <div className="imgContainer">
                <img src={book.image} alt={`Book cover of ${book.title}`} />
            </div>
            <p>{book.title}</p>
            <p>{book.authors.map((author, index) => {
                return (
                    index === 0
                        ? author
                        : `, ${author}`
                )
            })}</p>
        </li>
    )
}