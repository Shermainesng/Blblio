import BookListApi from "@/components/books/book-list-api";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from 'swr';

export default function AllPublicBooks() {
    // const [loadedBooks, setLoadedBooks] = useState(books.items)
    const fetcher = async (url) => await axios.get(url).then((res) => res.data);
    const {data, error} = useSWR('https://www.googleapis.com/books/v1/volumes?q=most+famous+books', fetcher)
    if (error) return <div>failed to load</div>
    if(!data) return <div>loading</div>
    
    
    return(
        <div>
            <h1>All Books Out there. Pick what you like</h1>
            {data && <BookListApi items={data.items}/>}
        </div>
    )
}

// export async function getStaticProps() {
//     const res = await fetch("https://www.googleapis.com/books/v1/volumes?q=most+famous+books")
//     const books = await res.json()
//     return {
//         props: {
//             books,
//         }
//     }
// }