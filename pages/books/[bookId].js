import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import AddBookToList from '@/components/books/add-book-to-list';
import { useState } from 'react';
import BookItem from '@/components/books/book-item';
import axios from "axios";
import Image from 'next/image';
import {PrismaClient} from '@prisma/client';

export default function BookDetails({book, lists, booksInAllLists}) {
    const [isShown, setIsShown] = useState(false);

    const router = useRouter();
    const bookId = router.query.bookId;

    console.log(booksInAllLists)

    function handleClick(e) {
        setIsShown(true);
      };
    
    if(!book) return <div>loading</div>
    // console.log(book)
    return (
        <div className='bg-green'>
            
            <h1 className='big-header-fonts text-center'>{book.volumeInfo.title}</h1>
            <div className='small-header-fonts text-center'>
                <p>{book.volumeInfo.publishedDate.slice(0,4)}</p>
                <p>Written by: {book.volumeInfo.authors}</p>

            </div>
            {typeof book.volumeInfo.imageLinks!= 'undefined' ? 
                <Image className='image-center' src= {book.volumeInfo.imageLinks.thumbnail} alt="pic of book" width={300} height={330}/>:
                <Image src={`http://books.google.com/books/content?id=SAFVv6aTpFMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`} alt="pic of book" width={300} height={300}/>
              }

            <p>{book.volumeInfo.description}</p>
            <button onClick={()=>handleClick()}>Add book to a list</button>
            {isShown ? <AddBookToList book={book} isShown={isShown} setIsShown={setIsShown} lists={lists} booksInAllLists={booksInAllLists}/>:null}
        </div>
    )
}

export async function getServerSideProps(context) {
    const prisma = new PrismaClient();
    var bookIdString = context.params.bookId;

    var res = await fetch (`https://www.googleapis.com/books/v1/volumes/${bookIdString}`)
    const book = await res.json()
    const lists = await prisma.List.findMany();
    const booksInAllLists = await prisma.booksOnLists.findMany();
    return {
        props: {
            book,
            lists,
            booksInAllLists: JSON.parse(JSON.stringify(booksInAllLists)),
        }
    }
}