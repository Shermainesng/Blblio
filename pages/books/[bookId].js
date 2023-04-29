import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import AddBookToList from '@/components/books/add-book-to-list';
import { useState } from 'react';
import BookItem from '@/components/books/book-item';
import axios from "axios";
import Image from 'next/image';
import {PrismaClient} from '@prisma/client';
import {noimg} from '/public/no-img.png';

export default function BookDetails({book, lists, booksInAllLists, allBooks}) {
    const [isShown, setIsShown] = useState(false);

    const router = useRouter();
    const bookId = router.query.bookId;

    console.log(booksInAllLists)

    function handleClick(e) {
        setIsShown(true);
      };
    
    if(!book) return <div>loading</div>

    function stripTags(html) {
        // var stringToStrip = ('<' + html);
        if (html) {
            var newHtml = html.replaceAll(/<\/?[^>]+(>|$)/gi, "")
        } else {
            newHtml = "No description available"
        }
        return newHtml;
    }
   
    return (
        <div className='bg-green'>
            
            <h1 className='big-header-fonts text-center pt-3'>{book.volumeInfo.title}</h1>
            <div className='small-header-fonts text-center'>
                <p>{book.volumeInfo.publishedDate.slice(0,4)}</p>
                <p>Written by: {book.volumeInfo.authors}</p>
            </div>


            {typeof book.volumeInfo.imageLinks!= 'undefined' ? 
                <Image className='image-center my-4' src= {book.volumeInfo.imageLinks.thumbnail} alt="pic of book" width={300} height={330}/>:
                <Image src={noimg} alt="pic of book" width={300} height={300}/>
              }
            
            <div className='book-desc-text mx-auto text-center para-fonts'>
                <p>{stripTags(book.volumeInfo.description)}</p>
            </div>

            <div className='text-center'>
                <button className="btn btn-yellow px-5 my-4" onClick={()=>handleClick()}>Add book to a list</button>
                {isShown ? <AddBookToList book={book} isShown={isShown} setIsShown={setIsShown} lists={lists} booksInAllLists={booksInAllLists} books={allBooks}/>:null}
            </div>

        
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
    const allBooks = await prisma.Book.findMany()
    return {
        props: {
            book,
            lists,
            booksInAllLists: JSON.parse(JSON.stringify(booksInAllLists)),
            allBooks
        }
    }
}