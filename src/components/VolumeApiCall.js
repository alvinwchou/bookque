// VolumeApiCall.js
import { useState, useEffect } from "react"
import axios from "axios"
import Form from "./Form";

export default function ApiCall(props) {
    const [bookResults, setBookResults] = useState([]);

    useEffect(() => {
        axios({
            url: `https://www.googleapis.com/books/v1/volumes`,
            params: {
                q: 'harry potter',
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
    }, [props.query])

    return (
        <div>
            <h2>API CALL</h2>
            {/* <Form /> */}
            <p>{props.query}</p>
            <ul>
                {
                    bookResults.map((bookResult) => {
                        return (
                            <li key={bookResult.id}>
                                <img src={bookResult.volumeInfo.imageLinks.thumbnail} alt={`Book cover of ${bookResult.volumeInfo.title}`} />
                                <p>{bookResult.volumeInfo.title}</p>
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