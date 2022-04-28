// myLibrary.js

import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react"
import firebase from "../firebase";
import Header from "./Header";

export default function MyLibrary() {
    const [myBooks, setMyBooks] = useState([]);

    useEffect(() => {
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        onValue(dbRef, (res) => {
            //create a new array, push items to it, set state to be new array
            const newState = [];
            const data = res.val();

            for (let propertyName in data) {
                newState.push( data[propertyName] );
            }

            setMyBooks(newState)
        })
    }, [])

    console.log(myBooks);
    return (
        <div className="myLibrary">
            <div className="wrapper">
                <Header />
                <ul>
                    {myBooks.map((book)=>{
                        return (
                            <li key={book.id}>
                                <img src={book.image} alt={`Book cover of ${book.title}`} />
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
                    })}
                </ul>
            </div>
        </div>
    )
}