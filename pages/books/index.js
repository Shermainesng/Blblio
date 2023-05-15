import BookListApi from "@/components/books/book-list-api";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from 'swr';
import Navbar from "@/components/ui/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function AllPublicBooks() {
    const [scrollable, setIsScrollable] = useState(true)

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
                <div class="row text-center">
            <h1 className='medium-header-fonts text-center mt-3 pb-3 pt-5'>DISCOVER</h1>
                    <div class="col-6 col-sm-6 col-md-3 col-lg-3">
                        <Link href={`/books/classics`}>
                            <Image src='/classics.png' alt="pic of book" width={250} height={250}/>
                        </Link>
                    </div>
                    <div class="col-6 col-sm-6 col-md-3 col-lg-3">
                        <Link href={`/books/topAuthors`}>
                            <Image src='/topauthors.png' alt="pic of book" width={250} height={250}/>
                        </Link>
                    </div>
                    <div class="col-6 col-sm-6 col-md-3 col-lg-3">
                        <Link href={`/books/newReleases`}>
                            <Image src='/newreleases.png' alt="pic of book" width={250} height={250}/>
                        </Link>
                    </div>
                    <div class="col-6 col-sm-6 col-md-3 col-lg-3">
                        <Link href={`/books/nonFiction`}>
                            <Image src='/nonfiction.png' alt="pic of book" width={250} height={250}/>
                        </Link>
                    </div>
                </div>

                <div>
                <h1 className='medium-header-fonts text-center pb-3 pt-5 mt-5'>MOST POPULAR BOOKS</h1>
                {data && <BookListApi items={data.items} scrollable/>}
                </div>
            </div>
        

</div>
    )
}