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
            const toReadList = [];
            const data = res.val();

            console.log(data);
            // if (data?.toRead) {
                // }
                
                
                for (let key in data) {
                    console.log(data[key]);
                    if (data[key].toRead) {
                        console.log('toRead');
                        toReadList.push(data[key].toRead)
                }
                newState.push( data[key] );
            }
            console.log(toReadList);
            setMyBooks(newState)
        })
    }, [])

    // const toReadList = myBooks.filter((category) => category === 'toRead')
    // console.log(toReadList);

    // console.log(myBooks);
    return (
        <div className="myLibrary">
            <div className="wrapper">
                <Header />
                <h2>My Library</h2>
                <ul className="toRead">
                    {myBooks.map((book)=>{
                        return (
                            // <li key={book.id} className="bookCard">
                            //     <div className="imgContainer">
                            //         <img src={book.image} alt={`Book cover of ${book.title}`} />
                            //     </div>
                            //     <p>{book.title}</p>
                            //     <p>{book.authors.map((author, index) => {
                            //         return(
                            //             index === 0
                            //             ? author
                            //             : `, ${author}`
                            //         )
                            //     })}</p>
                            // </li>
                            <li>Hi</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}