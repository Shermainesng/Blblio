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
        <div className='bg-pink container-fluid'>
            <div className='content-box mx-auto pt-3'>
                <h1 className='big-header-fonts'>{list.title}</h1>
                <p className='small-header-fonts'>{list.description}</p>
                
                <Link href={`/lists/${list.id}/editlist`}>
                    <button className='btn btn-yellow'>Edit this list</button>
                </Link>
                    
                <button className='btn btn-yellow' onClick={()=>handleDelete()}>Delete this list</button>
                <BookList items={books} isDelete={!isDelete}/>
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