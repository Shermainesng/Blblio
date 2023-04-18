import BookList from '@/components/books/book-list';
import axios from 'axios'
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
        <div>
        <h1>Edit the list!</h1>
        <h2>Title: {list.title}</h2>
            <form onSubmit = {handleEdit}> 
                <div>
                    <label htmlFor='title'>Title of your list:</label>
                    <input type='text' id='title' defaultValue={list.title} ref={titleInputRef}/>
                </div>
                <div>
                    <label htmlFor='description'>Describe your list:</label>
                    <input type='text' id='description' defaultValue={list.description} ref={descriptionInputRef}/>
                </div>
                <button>Save Changes</button>
            </form>
            <h1>All your books:</h1>
                <BookList items={initialBooks} isDelete={isDelete}/>
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