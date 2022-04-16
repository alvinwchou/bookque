// VolumeApiCall.js
import { useState, useEffect } from "react"
import axios from "axios"
import Form from "./Form";
import { useParams, Link } from "react-router-dom";


export default function VolumeApiCall() {
    const [bookResults, setBookResults] = useState([]);

    const {title: query} = useParams();
    useEffect(() => {
        axios({
            url: `https://www.googleapis.com/books/v1/volumes`,
            params: {
                q: decodeURIComponent(query),
                key: 'AIzaSyDoRrQbNko63UJtYicuNcl_iesA7acsBjI',
                maxResults: 3,
                printType: 'books'
            }
        }).then((results) => {
            console.log(results);
            setBookResults(results.data.items)
        }).catch((err) => {
            console.log(err)
        })
    }, [query])

    return (
        <div>
            <Link to='/'>
                <h2>API CALL</h2>
            </Link>
            <p>{decodeURIComponent(query)}</p>
            <Form />
            <ul>
                {
                    bookResults.map((bookResult) => {
                        console.log(bookResult);
                        return (
                            <li key={bookResult.id}>
                                <img src={bookResult.volumeInfo.imageLinks.thumbnail} alt={`Book cover of ${bookResult.volumeInfo.title}`} />
                                <Link to={`/book=${bookResult.id}`}>
                                    <p>{bookResult.volumeInfo.title}</p>
                                </Link>
                                <p>{bookResult.volumeInfo.authors[0]}</p>
                                <p>{bookResult.volumeInfo.publishedDate}</p>
                                <p>{bookResult.volumeInfo.description}</p>
                            </li>
                        )
                    })
                }
            </ul>

        </div>
    )
}