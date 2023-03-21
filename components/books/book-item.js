import axios from 'axios'
import { useState } from 'react';
import Image from 'next/image';
import AddBookToList from './add-book-to-list';
import Link from 'next/link';
import { useRouter } from 'next/router';

function BookItem(props) {
    const router = useRouter()
    const {id, title, author, description, category, imageUrl, publishedDate, publisher} = props;

    async function handleDelete() {
        const {data} = await axios.delete('/api/booksonlist', {
            data: {
                listid:props.listid,
                bookid:id
            }
        })
        router.reload()
    }
    return (
        <div>

            <Link href={`/books/${id}`}>
                <h1>Title: {title}</h1>
                {imageUrl !=null ?
                    <Image src={imageUrl} alt="pic of book" width={500} height={500}/>: <h1>no image</h1>
                }
            </Link>
            
            {props.isDelete ? 
                <button onClick={()=>handleDelete()}>Delete this book</button>: <p></p>
            }
        </div>
    )
}

export default BookItem;