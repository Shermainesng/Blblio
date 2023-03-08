import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import AddBookToList from '@/components/books/add-book-to-list';
import { useState } from 'react';

export default function BookDetails() {
    const [isShown, setIsShown] = useState(false);

    const router = useRouter();
    const bookId = router.query.bookId;

    function handleClick(e) {
        setIsShown(true);
      };
    
    return (
        <div>
            <h1>Book {bookId}</h1>
            <button onClick={()=>handleClick()}>Add book to a list</button>
            {isShown ? <AddBookToList bookId={bookId} isShown={isShown} setIsShown={setIsShown}/>:null}
        </div>
    )
}