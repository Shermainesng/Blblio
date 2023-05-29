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
    const router = useRouter();


    async function handleDelete() {
        const {data} = await axios.delete('/api/lists', {
            data: {
                id:list.id
            }
        })
        console.log(list.id);
        router.push('/lists');
    }

    return(
        <div className='bg-pink'>
            <div className='d-flex flex-column text-center pt-4 pb-5'>
                <h1 className='big-header-fonts'>{list.title}</h1>
                <p className='small-header-fonts'>{list.description}</p>
                <div className='pt-3'>
                    <Link href={`/lists/${list.id}/editlist`}>
                        <button className='btn btn-yellow mx-3'>Edit this list</button>
                    </Link>
                    
                    <button className='btn btn-yellow' onClick={()=>handleDelete()}>Delete this list</button>
                </div>
            </div>
            <BookList items={books} isDelete={!isDelete}/>
            <div className='text-center pb-5'>
                <Link href={`/books`}>
                    <button className='btn btn-green mx-3'>Add books to your list!</button>
                </Link>
            </div>
        </div>
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
      console.log('title here ' + list.title)
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