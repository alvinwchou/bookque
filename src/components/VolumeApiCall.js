// VolumeApiCall.js
import { useState, useEffect } from "react"
import axios from "axios"
import Form from "./Form";
import { useParams, Link } from "react-router-dom";
import logo from '../assets/bookque-transparent.png';



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
        <section className="volume">
            <div className="top">
                <Link to='/'>
                    <img src={logo} alt="bookque logo" />
                </Link>
                <Form />
                <Link to='/'>
                    <p>My Library</p>
                </Link>
            </div>
            <ul>
                {bookResults.map((bookResult) => {
                    console.log(bookResult);
                    return (
                        <li key={bookResult.id}>
                            <div className="imgContainer">
                                <Link to={`/book=${bookResult.id}`}>
                                    <img src={bookResult.volumeInfo.imageLinks.thumbnail} alt={`Book cover of ${bookResult.volumeInfo.title}`} />
                                </Link>
                            </div>
                            <div className="textContainer">
                                <div className="title">
                                    <Link to={`/book=${bookResult.id}`}>
                                        <p>
                                            {bookResult.volumeInfo.title}
                                            {bookResult.volumeInfo.subtitle
                                                ? `: ${bookResult.volumeInfo.subtitle}`
                                                : null
                                            }
                                        </p>
                                    </Link>
                                </div>
                                <div className="info">
                                    {bookResult.volumeInfo.authors.map((author, index) => {
                                        return (
                                            <p>
                                                {
                                                    index === 0
                                                    ? `${author}`
                                                    : `, ${author} `
                                                }
                                            </p>
                                        )
                                    })}
                                    <p>&nbsp;· {bookResult.volumeInfo.publishedDate.substring(0, 4)}</p>
                                </div>
                                <p>{bookResult.volumeInfo.description}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}