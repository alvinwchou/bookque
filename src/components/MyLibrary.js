// myLibrary.js

import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react"
import firebase from "../firebase";
import BookList from "./BookList";
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
                        ? myBooks.toRead.map((eachBook) => {
                            return (
                                <BookList book={eachBook} />
                            )
                        })
                        : null
                    }
                </ul>

                <ul>
                    <p>fav</p>
                    {myBooks.fav
                        ? myBooks.fav.map((eachBook) => {
                            return (
                                <BookList book={eachBook} />
                            )
                        })
                        : null
                    }
                </ul>

                <ul>
                    <p>have read</p>
                    {myBooks.haveRead
                        ? myBooks.haveRead.map((eachBook) => {
                            return (
                                <BookList book={eachBook} />
                            )
                        })
                        : null
                    }
                </ul>

            </div>
        </div>
    )
}