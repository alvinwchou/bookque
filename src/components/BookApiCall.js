// BookApiCall.js
import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import firebase from "./firebase";
import { getDatabase, ref, set } from 'firebase/database'


export default function BookApiCall() {
    const [bookResults, setBookResults] = useState([]);

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

    const handleClick = () => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `${book_Id}`);

        const myLibraryData = {
            id: book_Id,
            title: bookResults.title,
            image: bookResults.imageLinks.thumbnail,
        };

        set(dbRef, myLibraryData)
    };

    return (
        <div className="book">
            <div className="wrapper">
                <Header />
                {bookResults.title
                    ? <div className="overview">
                        {bookResults.imageLinks // check if there is an image
                            ? <img src={bookResults.imageLinks.thumbnail} alt={`Book cover of ${bookResults.title}`} />
                            : <div className="noImage">
                                <p>No image available</p>
                            </div>
                        }
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
                        &nbsp;· 
                        {bookResults.publishedDate // check if there is a published date and take only the year
                            ? bookResults.publishedDate.substring(0, 4)
                            : null
                        }
                        </p>
                        <button onClick={handleClick}><span className="addBlue">+</span> Add to my library</button>
                        <div className="textContainer">
                            <p>ISBN: 
                                {bookResults.industryIdentifiers // check if there are ISBN numbers
                                    ? bookResults.industryIdentifiers.map((eachIdentifier) => {
                                        return (
                                            `${eachIdentifier.identifier} `
                                        )
                                    })
                                    : ' Unavailable'
                                }
                            </p>
                            <p>Category: {bookResults.categories[0]}</p>
                            <p>Page count: {bookResults.pageCount ? bookResults.pageCount : 'Unavailable'}</p>
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