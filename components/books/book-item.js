import axios from 'axios'
import { useState } from 'react';
import Image from 'next/image';
import AddBookToList from './add-book-to-list';
import Link from 'next/link';

function BookItem(props) {
    const {id, title, author, description, category, imageUrl, publishedDate, publisher} = props;
    const [isDelete, setIsDelete] = useState();

    async function handleDelete() {
        const {data} = await axios.delete('/api/books', {
            data: {
                id:id
            }
        })
        console.log(id);
    }

    console.log(author)
    return (
        <div>
            <Link href={`/books/${id}`}>
                <h1>id: {id}</h1>
                <h1>Title: {title}</h1>
                <p>Author:{author}</p>
                <p>Description: {description}</p>
                <p>Category: {category}</p>
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