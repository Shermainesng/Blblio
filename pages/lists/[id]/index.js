import axios from 'axios'
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { prisma } from '@/server/db/client';
import BookList from '@/components/books/book-list';
import { useRef,useState } from 'react'

export default function IndivList({list, initialBooks}){
    const [isDelete] = useState(false);
    console.log(initialBooks);

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
            <h2>{list.title}</h2>
        
            <Link href={`/lists/${list.id}/editlist`}>Edit this List</Link>
            <button onClick={()=>handleDelete()}>Delete this list</button>
            <h1>Books in your List:</h1>
                <BookList items={initialBooks} isDelete={isDelete}/>
        </>
    )

}
export async function getServerSideProps({params}){
    const listId = parseInt(params.id)
    const list = await prisma.List.findUnique({
        where: {
          id: listId
        },
      })

      const books = await prisma.book.findMany({
        where: {
            listId: parseInt(params.id)
        },
    })

    return{
        props:{
            list,
            initialBooks: books

        }
    }
} 