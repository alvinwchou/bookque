// VolumeApiCall.js
import { useState, useEffect } from "react"
import axios from "axios"
import Form from "./Form";
import { useParams } from "react-router-dom";

export default function ApiCall(props) {
    const [bookResults, setBookResults] = useState([]);

    const {search: query} = useParams()
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
    }, [props])

    return (
        <div>
            <h2>API CALL</h2>
            {/* <Form /> */}
            <ul>
                {
                    bookResults.map((bookResult) => {
                        console.log(bookResult);
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