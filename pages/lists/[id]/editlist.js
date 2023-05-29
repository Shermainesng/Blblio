import BookList from '@/components/books/book-list';
import axios from 'axios'
import Link from 'next/link';
import {useRouter} from 'next/router';
import { useRef,useState } from 'react'

export default function EditList({list, initialBooks}) {
    const router = useRouter()
    console.log(initialBooks)

    const [isDelete] = useState(true);
    const titleInputRef = useRef();
    const descriptionInputRef = useRef();

    async function handleEdit(event) {
        event.preventDefault();
        const editTitle = titleInputRef.current.value;
        const editDescription = descriptionInputRef.current.value;
        const {data} = await axios.put('/api/lists', {
            id:list.id,
            title: editTitle,
            description: editDescription
        })
        router.push("/lists/" + list.id)
    }
    

    return (
        <div className='bg-pink'>
            <div className='d-flex flex-column text-center pt-4 pb-5'>
                <h2>Edit your list:</h2>
                <form onSubmit = {handleEdit}> 
                    <div>
                        {/* <label className='medium-header-fonts' htmlFor='title'>Title of your list:</label> */}
                        <input className='input-field big-header-fonts mb-2 text-center' type='text' id='title' defaultValue={list.title} ref={titleInputRef}/>
                    </div>
                    <div>
                        {/* <label className='medium-header-fonts' htmlFor='description'>Describe your list:</label> */}
                        <textarea className='input-field small-header-fonts text-center' type='text' id='description' defaultValue={list.description} ref={descriptionInputRef}/>
                    </div>
                    <button className='mt-4 btn btn-yellow'>Save changes</button>
                </form>
            </div>
                <BookList items={initialBooks} isDelete={isDelete}/>
            
            <div className='text-center pb-5'>
                <Link href={`/books`}>
                    <button className='btn btn-green mx-3'>Add more books to your list!</button>
                </Link>
            </div>
        </div>
    )
}

export async function getServerSideProps({params}){
    console.log(params);
    const listId = parseInt(params.id)
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
            initialBooks: books
        }
    }
} 