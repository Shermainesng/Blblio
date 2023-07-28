import axios from 'axios';
import {useRouter} from 'next/router';
import ListsOfLists from '../lists/lists-list';
import { useState } from 'react';
import Link from 'next/link';
// import {useSession, getSession} from 'next-auth/client'
import {PrismaClient} from '@prisma/client';

export default function AddBookToList(props) {
    const router = useRouter()
    const [canAddToList, setCanAddToList] = useState(true);

    function handleCancel() {
        {props.setIsShown(false)}
    }

    

    async function handleAddBookToList(listId, bookId) {
        console.log("this is list id " + listId)
        console.log("this is book id " + bookId)
        if(!bookId) {
            return <div>loading</div>

        } 
    
        var found = props.booksInAllLists.find(book => book.bookId  ==  bookId && book.listId == listId);
        console.log(found);
        if (typeof found == 'undefined') {
            const {bookonlist} = await axios.post('/api/booksonlist', {
                listId: listId,
                bookId: bookId
            })
            const {bookadded} = await axios.post('/api/books', {
                bookId: bookId,
                listId: listId, 
                title: props.book.volumeInfo.title, 
                author: props.book.volumeInfo.authors ? props.book.volumeInfo.authors[0]: "no author", 
                publisher: props.book.volumeInfo.publisher, 
                publishedDate: props.book.volumeInfo.publishedDate,
                category: props.book.volumeInfo.categories ? props.book.volumeInfo.categories[0] : "fake category",
                imageUrl: props.book.volumeInfo.imageLinks.thumbnail,
                description: props.book.volumeInfo.description ? props.book.volumeInfo.description: "this is"
            })
            router.push(`/books`);

        } else {
            alert("book is already in your list!")
        }
    }
   
    return(
        <div className='bg-green' id='down'>
            <h1  className='medium-header-fonts'>which list do you want to add {props.book.volumeInfo.title} to?</h1>
           
            <div className='d-flex flex-column'>
                <h2 className='medium-header-fonts'>YOUR LISTS:</h2>
                {props.lists.length > 0 ? 
                <div>
                    <ListsOfLists initialLists={props.lists} canAddToList={canAddToList} books={props.books} book={props.book}/>
                    <button className="btn btn-pink mt-2 px-5" onClick={()=>handleCancel()}>Cancel</button> 
                </div>:
                <div>
                    <h2>You have no lists yet. Create one now and start adding your favourite books to it!</h2>
                    <button className='btn btn-pink'>
                        <Link href='/lists/addlist'>Create a list</Link>
                    </button>
                    <button className="btn btn-yellow mx-5 px-5" onClick={()=>handleCancel()}>Cancel</button> 
                </div>
                }
            </div>  
        </div>
    )
}

