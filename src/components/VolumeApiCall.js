// VolumeApiCall.js
import { useState, useEffect } from "react"
import axios from "axios"
import Form from "./Form";
import { useParams, Link } from "react-router-dom";
import logo from '../assets/bookque-transparent.png';
import library from '../assets/book-bookmark-solid.svg'




export default function VolumeApiCall() {
    const [bookResults, setBookResults] = useState([]);

    const {title: query} = useParams();
    useEffect(() => {
        axios({
            url: `https://www.googleapis.com/books/v1/volumes`,
            params: {
                q: decodeURIComponent(query),
                key: 'AIzaSyDoRrQbNko63UJtYicuNcl_iesA7acsBjI',
                // maxResults: 10,
                // startIndex: 0,
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
            <div className="wrapper">
                <div className="top">
                    <Link to='/'>
                        <img src={logo} alt="bookque logo" />
                    </Link>
                    <Form />
                    <Link to='/'>
                        <img src={library} alt="My library button" />
                    </Link>
                </div>
                <ul>
                    {bookResults.map((bookResult) => {
                        console.log(bookResult);
                        return (
                            <li key={bookResult.id}>
                                <div className="imgContainer">
                                    {bookResult.volumeInfo.imageLinks
                                        ? <Link to={`/book=${bookResult.id}`}>
                                            <img src={bookResult.volumeInfo.imageLinks.thumbnail} alt={`Book cover of ${bookResult.volumeInfo.title}`} />
                                        </Link>
                                        : <div className="noImage">
                                            <p>No image available</p>
                                        </div>
                                    }
                                </div>
                                <div className="textContainer">
                                    <div className="title">
                                        <Link to={`/book=${bookResult.id}`}>
                                            <h2>
                                                {bookResult.volumeInfo.title}
                                                {bookResult.volumeInfo.subtitle
                                                    ? `: ${bookResult.volumeInfo.subtitle}`
                                                    : null
                                                }
                                            </h2>
                                        </Link>
                                    </div>
                                    <div className="info">
                                        {bookResult.volumeInfo.authors
                                            ? bookResult.volumeInfo.authors.map((author, index) => {
                                                return (
                                                    <Link to={`/search=${encodeURIComponent(encodeURIComponent(`inauthor:"${author}"`))}`}>
                                                        {
                                                            index === 0
                                                            ? `${author}`
                                                            : `, ${author} `
                                                        }
                                                    </Link>
                                                )
                                            })
                                            : <p>No author available</p>
                                        }
                                        {bookResult.volumeInfo.publishedDate
                                            ? <p>&nbsp;· {bookResult.volumeInfo.publishedDate.substring(0, 4)}</p>
                                            : null
                                        }
                                        
                                    </div>
                                    <p>{bookResult.volumeInfo.description}</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}