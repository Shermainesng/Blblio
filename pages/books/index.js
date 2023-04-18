import BookListApi from "@/components/books/book-list-api";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from 'swr';
import Navbar from "@/components/ui/Navbar";

export default function AllPublicBooks() {
    // const [loadedBooks, setLoadedBooks] = useState(books.items)
    const fetcher = async (url) => await axios.get(url).then((res) => res.data);
    const {data, error} = useSWR('https://www.googleapis.com/books/v1/volumes?q=most+famous+books&maxResults=30', fetcher)
    if (error) return <div>failed to load</div>
    if(!data) return <div>loading</div>
    console.log(data)
    
    return(
        <div>
            <div className='bg-yellow d-flex justify-content-around align-items-center pt-5 pb-3'>
                <h1 className='big-header-fonts'>THE SOCIAL NETWORK<br/> FOR AVID BOOK <br/> READERS</h1>
                <div className="align-self-end para-fonts mb-3">
                    <p>Track book you have read <br/>
                        Save those that you want to see <br/>
                        Tell the community what is good <br/> 
                    </p>
                </div>
            </div>
            <div className='bg-pink'>
                <h1 className='medium-header-fonts text-center py-4'>BROWSE BOOKS</h1>
                {data && <BookListApi items={data.items}/>}
            </div>
        

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