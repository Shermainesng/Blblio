import axios from 'axios'
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { prisma } from '@/server/db/client';
import BookList from '@/components/books/book-list';
import { useEffect, useRef,useState } from 'react'
import {getDetailsForBook} from '../../api/books'

export default function IndivList({list, bookIds}){
    var [finalbooks, setBooks] = useState([])
    const [isDelete] = useState(false);
    console.log("THIS IS BOOK id " + bookIds[0].bookId);

    useEffect(() => {
        gettingBook();
    }, [])

    async function gettingBook(){
        var books = []
        if (bookIds.length >= 0) {
            for (let i=0; i<bookIds.length; i++) {
                var bookIdString = bookIds[i].bookId;
                var book = await getDetailsForBook(bookIdString)
                if (!book && !book.volumeInfo) {
                    return <div>loading</div>
                } else {
                    books.push(book)
                    console.log(books)
                }
            }
            setBooks(books);
        }
    }

    async function handleDelete() {
        // listId = parseInt(listId);
        const {data} = await axios.delete('/api/lists', {
            data: {
                id:list.id
            }
        })
        console.log(list.id);
    }

    return(
        <>
            <h2>{list.title} ID: {list.id}</h2>
        
            <Link href={`/lists/${list.id}/editlist`}>Edit this List</Link>
            <button onClick={()=>handleDelete()}>Delete this list</button>
            <h1>Books in your List:</h1>
                <BookList items={finalbooks} isDelete={isDelete}/>
        </>
    )

}
export async function getServerSideProps({params}){
    const listId = parseInt(params.id)
    console.log(listId)
    const list = await prisma.List.findUnique({
        where: {
          id: listId
        },
      })

      const bookIds = await prisma.BooksOnLists.findMany({
        where: {
            listId: parseInt(params.id)
        },
    })

    return{
        props:{
            list,
            bookIds: JSON.parse(JSON.stringify(bookIds)),

        }
    }
} 