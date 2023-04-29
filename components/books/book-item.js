import axios from 'axios'
import { useState } from 'react';
import Image from 'next/image';
import AddBookToList from './add-book-to-list';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {noimg} from '/public/no-img.png';

function BookItem(props) {
    const router = useRouter()

    async function handleDelete() {
        if(props.bookId) {
            const {data} = await axios.delete('/api/booksonlist', {
                data: {
                    listId:props.listId,
                    bookId:props.bookId
                }
            })
            const {deleteBook} = await axios.delete('/api/books', {
                data: {
                    listId: props.listid, 
                    bookId: props.bookId
                }
            })

        }
        router.reload()
    }
    return (
        <div className='book-title-table d-flex flex-column align-items-center pb-3'>

            <Link href={`/books/${props.bookId}`}>
                <h1>Title: {props.title}</h1>
                {props.imageUrl !=null ?
                    <Image src={props.imageUrl} alt="pic of book" width={500} height={500}/>: <Image src={noimg} alt="pic of book" width={500} height={500}/>
                }
            </Link>
            
            {props.isDelete ? 
                <button onClick={()=>handleDelete()}>Delete this book</button>: <p></p>
            }
        </div>
    )
}

export default BookItem;