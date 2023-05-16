import axios from 'axios'
import { useState } from 'react';
import Image from 'next/image';
import AddBookToList from './add-book-to-list';
import Link from 'next/link';
import { useRouter } from 'next/router';

function BookItem(props) {
    const router = useRouter()
    console.log(props.book.bookId)
    async function handleDelete() {
        if(props.book.bookId) {
            const {data} = await axios.delete('/api/booksonlist', {
                data: {
                    listId:props.book.listId,
                    bookId:props.book.bookId
                }
            })
            const {deleteBook} = await axios.delete('/api/books', {
                data: {
                    listId: props.book.listId, 
                    id: props.book.id
                }
            })

        }
        router.reload()
    }
    return (
        <div className='col-12 col-sm-12 col-md-6 col-lg-4'>
            <Link href={`/books/${props.book.bookId}`}>
                <div className="book-title-table d-flex flex-column align-items-center pb-3">
                {typeof props.book.imageUrl !=null ?
                    <Image src={props.book.imageUrl} alt="pic of book" width={250} height={300}/>: 
                    <Image src='/no-img.png' alt="pic of book" width={250} height={300}/>
                }
                <p className="book-title pt-2">
                    {props.book.title}
                </p>
                </div>
            </Link>   
             

            {props.isDelete ? 
                <button onClick={()=>handleDelete()}>Delete this book</button>: <p></p>
            }
     
        </div>
    )
}

export default BookItem;