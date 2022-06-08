// VolumeApiCall.js
import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, Link } from "react-router-dom";
import Header from './Header'

export default function VolumeApiCall() {
    const [volumeResults, setVolumeResults] = useState([]);

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
            setVolumeResults(results.data.items)
        }).catch((err) => {
            alert(err)
        })
    }, [query])

    return (
        <section className="volume">
            <div className="wrapper">
                <Header />
                <ul className="volumeList">
                    {volumeResults // check if returned with book information
                            ? (volumeResults.map((volumeResult) => {
                                return (
                                    <li key={volumeResult.id}>
                                        <div className="imgContainer">
                                            {volumeResult.volumeInfo.imageLinks // check for image
                                                ? <Link to={`/book=${volumeResult.id}`}>
                                                    <img src={volumeResult.volumeInfo.imageLinks.thumbnail} alt={`Book cover of ${volumeResult.volumeInfo.title}`} />
                                                </Link>
                                                : <div className="noImage">
                                                    <p>No image available</p>
                                                </div>
                                            }
                                        </div>
                                        <div className="textContainer">
                                            <div className="title">
                                                <Link to={`/book=${volumeResult.id}`}>
                                                    <h2>
                                                        {volumeResult.volumeInfo.title}
                                                        {volumeResult.volumeInfo.subtitle // check for subtitle
                                                            ? `: ${volumeResult.volumeInfo.subtitle}`
                                                            : null
                                                        }
                                                    </h2>
                                                </Link>
                                            </div>
                                            <div className="info">
                                                {volumeResult.volumeInfo.authors // check for authors
                                                    ? volumeResult.volumeInfo.authors.map((author, index) => {
                                                        return (
                                                            <Link to={`/search=${encodeURIComponent(encodeURIComponent(`inauthor:"${author}"`))}`} key={index}>
                                                                {
                                                                    index === 0
                                                                    ? author
                                                                    : `, ${author}`
                                                                }
                                                            </Link>
                                                        )
                                                    })
                                                    : <p>No author available</p>
                                                }
                                                {volumeResult.volumeInfo.publishedDate // check if there is a published date, if so show the year
                                                    ? <p>&nbsp;· {volumeResult.volumeInfo.publishedDate.substring(0, 4)}</p>
                                                    : null
                                                }
                                                
                                            </div>
                                            <p>{volumeResult.volumeInfo.description}</p>
                                        </div>
                                    </li>
                                )
                            }))
                            : <li className="noResults">
                                <div>
                                <p>Your search -<strong>{decodeURIComponent(query)}</strong>- did not match any book results.</p>
                                    <p>Make sure that all words are spelled correctly, or try a different / more general keywords.</p>
                                </div>
                            </li>
                    }
                </ul>
            </div>
        </section>
    )
}   