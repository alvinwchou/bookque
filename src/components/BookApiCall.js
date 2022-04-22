// BookApiCall.js
import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, Link } from "react-router-dom";
import Header from "./Header";


export default function BookApiCall() {
    const [bookResults, setBookResults] = useState([])

    const {bookId: book_Id} = useParams();

    useEffect(() => {
        axios({
            url: `https://www.googleapis.com/books/v1/volumes/${book_Id}`,
            // params: {
            //     key: 'AIzaSyDoRrQbNko63UJtYicuNcl_iesA7acsBjI',
            // }
        }).then((results) => {
            console.log(results);
            console.log(results.data.volumeInfo);
            setBookResults(results.data.volumeInfo)
        })
    },[book_Id])

    return (
        <div className="book">
            <div className="wrapper">
                <Header />
                <p>Book ID: {book_Id}</p>
                {bookResults.title
                    ? <div className="overview">
                                <img src={bookResults.imageLinks.thumbnail} alt={`Book cover of ${bookResults.title}`} />
                                <h2>{bookResults.title}</h2>
                                <h3>{bookResults.subtitle}</h3>
                                <p>by {bookResults.authors.map((author, index) => {
                                    return (
                                        <Link to={`/search=${encodeURIComponent(encodeURIComponent(`inauthor:"${author}"`))}`}>
                                            {
                                                index === 0
                                                    ? author 
                                                    : `, ${author}`
                                            }
                                        </Link>
                                    )
                                })}
                                &nbsp;· {bookResults.publishedDate.substring(0, 4)}
                                </p>
                                <p>Add to my library</p>
                        <div className="textContainer">
                            <p>ISBN: {bookResults.industryIdentifiers.map((eachIdentifier) => {
                                return (
                                    `${eachIdentifier.identifier} `
                                )
                            })}</p>
                            <p>Page count: {bookResults.pageCount}</p>
                            <p>{bookResults.description}</p>
                        </div>

                        {/* <p>What people are saying - Write a review (COMING SOON)</p> */}
                    </div>
                    : null
                }
            </div>
        </div>
    )
}