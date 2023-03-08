import axios from 'axios'
import { useState } from 'react';
import Image from 'next/image';

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
            <h1>Title: {title}</h1>
            <p>Author:{author}</p>
            <p>Description: {description}</p>
            <p>Category: {category}</p>
            <Image src="https://books.google.com/books/content?id=SAFVv6aTpFMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" alt="pic of book" width={500} height={500}/>
            
            {props.isDelete ? 
                <button onClick={()=>handleDelete()}>Delete this book</button>: <p></p>
            }
        </div>
    )
}

export default BookItem;