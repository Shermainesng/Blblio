import axios from 'axios'
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { prisma } from '@/server/db/client';
import BookList from '@/components/books/book-list';
import { useEffect, useRef,useState } from 'react'
import {getDetailsForBook} from '../../api/booksMethods'


export default function IndivList({list, books}){
    var [finalbooks, setBooks] = useState([])
    var [loading, setLoading] = useState(false)
    const [isDelete] = useState(true);

    async function handleDelete() {
        const {data} = await axios.delete('/api/lists', {
            data: {
                id:list.id
            }
        })
        console.log(list.id);
    }

    return(
        <>
            <h2>{list.title} LIST ID: {list.id}</h2>
        
            <Link href={`/lists/${list.id}/editlist`}>Edit this List</Link>
            <button onClick={()=>handleDelete()}>Delete this list</button>
            <BookList items={books} isDelete={!isDelete}/>
 
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

      const books = await prisma.Book.findMany({
        where: {
            listId: parseInt(params.id)
        },
    })

    return{
        props:{
            list,
            books: books,

        }
    }
} 