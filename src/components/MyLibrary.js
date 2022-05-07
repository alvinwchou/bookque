// myLibrary.js

import { getDatabase, onValue, ref, remove, set, update, get } from "firebase/database";
import { useEffect, useState } from "react"
import firebase from "../firebase";
import BookList from "./BookList";
import Header from "./Header";

export default function MyLibrary() {
    console.log('MyLibrary Component');
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

    const handleRemove = (bookId, category, newCategory) => {
        console.log('handleRemove');
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/${bookId}`)
        //make a copy of data to new category
        // onValue(dbRef, (res) => {
        //     const data = res.val()
        //     console.log(data[category])
        //     const myLibraryData = {
        //         [newCategory] : data[category]
        //     }
        //     console.log('New data push to db', myLibraryData);

        //     set(dbRef, myLibraryData)
            

        // })

        if (newCategory == 'remove') {
            remove(dbRef) // remove from db
        } else {
            // change property name to new category name
            get(dbRef)
            .then( (res) => {
                console.log(res.val())
                const data = res.val();
                console.log(data);
                
                const myLibraryData = {
                    [newCategory] : data[category]
                }
                console.log('New data push to db', myLibraryData);
                set(dbRef, myLibraryData)
            })
        }
    }

    return (
        <div className="myLibrary">
            <div className="wrapper">
                <Header />
                <h2>My Library</h2>
                <h3>To read</h3>
                <ul>
                    {myBooks.toRead
                        ? myBooks.toRead.map((eachBook) => {
                            return (
                                <BookList book={eachBook} label='toRead' handleOption={handleRemove}/>
                            )
                        })
                        : null
                    }
                </ul>

                <h3>Favourites</h3>
                <ul>
                    {myBooks.fav
                        ? myBooks.fav.map((eachBook) => {
                            return (
                                <BookList book={eachBook} label='fav' handleOption={handleRemove}/>
                            )
                        })
                        : null
                    }
                </ul>

                <h3>Have read</h3>
                <ul>
                    {myBooks.haveRead
                        ? myBooks.haveRead.map((eachBook) => {
                            return (
                                <BookList book={eachBook} label='haveRead' handleOption={handleRemove}/>
                            )
                        })
                        : null
                    }
                </ul>
            </div>
        </div>
    )
}