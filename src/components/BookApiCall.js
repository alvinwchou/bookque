// BookApiCall.js
import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import firebase from "../firebase";
import { get, getDatabase, ref, set } from 'firebase/database'


export default function BookApiCall({darkMode}) {
    const [bookResults, setBookResults] = useState([]);
    const [showLibraryOptions, setShowLibraryOptions] = useState(false);

    //
    const [alreadyAdded, setAlreadyAdded] = useState(true);

    const {bookId: book_Id} = useParams();

    useEffect(() => {
        axios({
            url: `https://www.googleapis.com/books/v1/volumes/${book_Id}`
        }).then((results) => {
            setBookResults(results.data.volumeInfo)
        })

        const database = getDatabase(firebase);
        const dbRef = ref(database, `${book_Id}`);

        // check if the book id already exists in the db
        get(dbRef)
            .then((res) => res.val() ? setAlreadyAdded(true) : setAlreadyAdded(false))
    },[book_Id])

    const handleClick = (e) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `${book_Id}`);

        const myLibraryData = {
            [e.target.value]: {
                id: book_Id,
                title: bookResults.title,
                image: bookResults.imageLinks ? bookResults.imageLinks.thumbnail : null,
                authors: bookResults.authors,
            }
        };

        set(dbRef, myLibraryData);
        setAlreadyAdded(true);
    };

    const handleAddLibraryClick = () => {
        setShowLibraryOptions(!showLibraryOptions)
    }

    return (
        <div className="book">
            <div className="wrapper">
                <Header darkMode={darkMode}/>
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
                                <Link to={`/search=${encodeURIComponent(encodeURIComponent(`inauthor:"${author}"`))}`} className={darkMode && 'darkModeAnchor'} key={index}>
                                    {index === 0
                                        ? author 
                                        : `, ${author}`
                                    }
                                </Link>
                            )
                        })}
                        &nbsp;?? {bookResults.publishedDate // check if there is a published date and take only the year
                            ? bookResults.publishedDate.substring(0, 4)
                            : null
                        }</p>

                        {/* check if the book has already been added */}
                        {alreadyAdded
                            ? <p className="inLibrary">Book is in your <Link to='/myLibrary' className={darkMode && 'darkModeAnchor'} >Library</Link></p>
                            : showLibraryOptions
                                ? <div className="libraryOptions">
                                    <button value="toRead" onClick={handleClick} className={darkMode && 'darkModeBase'}>
                                        <span className={darkMode ? 'darkModeAnchor' : 'addBlue'}>+ </span>
                                        Add to read
                                    </button>
                                    <button value="fav" onClick={handleClick} className={darkMode && 'darkModeBase'}>
                                        <span className={darkMode ? 'darkModeAnchor' : 'addBlue'}>+ </span>
                                        Add to fav
                                    </button>
                                    <button value="haveRead" onClick={handleClick} className={darkMode && 'darkModeBase'}>
                                        <span className={darkMode ? 'darkModeAnchor' : 'addBlue'}>+ </span>
                                        Add to have read
                                    </button>
                                </div>
                                : <button onClick={handleAddLibraryClick} className={darkMode && 'darkModeBase'}>
                                    <span className={darkMode ? 'darkModeAnchor' : 'addBlue'}>+ </span>
                                    Add to my library
                                </button>
                        }

                        
                        <div className="textContainer">
                            <p>ISBN:&nbsp;
                                {bookResults.industryIdentifiers // check if there are ISBN numbers
                                    ? bookResults.industryIdentifiers.map(eachIdentifier => {
                                        return (
                                            `${eachIdentifier.identifier} `
                                        )
                                    })
                                    : ' Unavailable'
                                }
                            </p>
                            <p>Category:&nbsp;
                                {bookResults.categories
                                    ? <Link to={`/search=${encodeURIComponent(encodeURIComponent(`subject:"${bookResults.categories[0]}"`))}`} className={darkMode && 'darkModeAnchor'} >{bookResults.categories[0]}</Link>
                                : 'Unavailable'}</p>
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