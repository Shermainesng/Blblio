import BookListApi from "@/components/books/book-list-api";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AllPublicBooks({books}) {
    console.log(books)
    return(
        <div>
            <h1>All Books Out there. Pick what you like</h1>
            {books && <BookListApi items={books.items}/>}
        </div>
    )
}

export async function getStaticProps() {
    const res = await fetch("https://www.googleapis.com/books/v1/volumes?q=most+famous+books")
    const books = await res.json()
    return {
        props: {
            books,
        }
    }
}