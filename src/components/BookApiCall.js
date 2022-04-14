// BookApiCall.js
import { useState, useEffect } from "react"
import axios from "axios"

export default function BookApiCall() {
    const bookId = 'zyTCAlFPjgYC';

    useEffect(() => {
        axios({
            url: `https://www.googleapis.com/books/v1/volumes/${bookId}`,
            params: {
                key: 'AIzaSyDoRrQbNko63UJtYicuNcl_iesA7acsBjI',
            }
        }).then((results) => {
            console.log(results);
        })
    },[])

    return (
        <div>
            <h2>Book Api</h2>
        </div>
    )
}