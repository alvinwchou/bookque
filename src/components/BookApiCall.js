// BookApiCall.js
import { useState, useEffect } from "react"
import axios from "axios"
import Form from "./Form";
import { useParams, Link } from "react-router-dom";


export default function BookApiCall() {
    const [bookResults, setBookResults] = useState([])

    const {bookId: book_Id} = useParams();

    useEffect(() => {
        axios({
            url: `https://www.googleapis.com/books/v1/volumes/${book_Id}`,
            params: {
                key: 'AIzaSyDoRrQbNko63UJtYicuNcl_iesA7acsBjI',
            }
        }).then((results) => {
            console.log(results);
            console.log(results.data.volumeInfo);
            setBookResults(results.data.volumeInfo)
        })
    },[book_Id])

    return (
        <div>
            <Link to='/'>
                <h2>Book Api</h2>
            </Link>
            <p>Book ID: {book_Id}</p>
            <Form />
            <ul>
                {
                    bookResults.title
                        ? <li>
                            <img src={bookResults.imageLinks.thumbnail} alt={`Book cover of ${bookResults.title}`} />
                            <p>{bookResults.title}</p>
                            <p>{bookResults.authors[0]}</p>
                            <p>{bookResults.publishedDate}</p>
                            <p>{bookResults.description}</p>
                        </li>
                        : null
                }
            </ul>
        </div>
    )
}