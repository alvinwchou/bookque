// myLibrary.js

import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react"
import firebase from "../firebase";
import Header from "./Header";

export default function MyLibrary() {
    const [myBooks, setMyBooks] = useState({});

    useEffect(() => {
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        onValue(dbRef, (res) => {
            //create a new array to sort the books, push items to it
            const toReadList = [];
            const favList = [];
            const haveReadList = [];
            const data = res.val();

            // I think I can use .filter() here
            for (let key in data) {
                if (data[key].toRead) {
                    console.log('toRead');
                    toReadList.push(data[key].toRead)
                } else if (data[key].fav) {
                    favList.push(data[key].fav)
                } else if (data[key].haveRead) {
                    haveReadList.push(data[key].haveRead)
                }
            }

            // create a new object to hold the 3 arrays
            const newState = {
                toRead: toReadList,
                fav: favList,
                haveRead: haveReadList
            }

            setMyBooks(newState);
        })
    }, [])

    return (
        <div className="myLibrary">
            <div className="wrapper">
                <Header />
                <h2>My Library</h2>
                <ul>
                    <p>to Read</p>
                    {myBooks.toRead
                        ? myBooks.toRead.map((book) => {
                            return (
                                <li key={book.id} className="bookCard">
                                    <div className="imgContainer">
                                        <img src={book.image} alt={`Book cover of ${book.title}`} />
                                    </div>
                                    <p>{book.title}</p>
                                    <p>{book.authors.map((author, index) => {
                                        return(
                                            index === 0
                                            ? author
                                            : `, ${author}`
                                        )
                                    })}</p>
                                </li>
                            )
                        })
                        : null
                    }
                </ul>

                <ul>
                    <p>fav</p>
                    {myBooks.fav
                        ? myBooks.fav.map((book) => {
                            return (
                                <li key={book.id} className="bookCard">
                                    <div className="imgContainer">
                                        <img src={book.image} alt={`Book cover of ${book.title}`} />
                                    </div>
                                    <p>{book.title}</p>
                                    <p>{book.authors.map((author, index) => {
                                        return(
                                            index === 0
                                            ? author
                                            : `, ${author}`
                                        )
                                    })}</p>
                                </li>
                            )
                        })
                        : null
                    }
                </ul>

                <ul>
                    <p>have read</p>
                    {myBooks.haveRead
                        ? myBooks.haveRead.map((book) => {
                            return (
                                <li key={book.id} className="bookCard">
                                    <div className="imgContainer">
                                        <img src={book.image} alt={`Book cover of ${book.title}`} />
                                    </div>
                                    <p>{book.title}</p>
                                    <p>{book.authors.map((author, index) => {
                                        return(
                                            index === 0
                                            ? author
                                            : `, ${author}`
                                        )
                                    })}</p>
                                </li>
                            )
                        })
                        : null
                    }
                </ul>

            </div>
        </div>
    )
}