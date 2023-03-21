import axios from 'axios';
import {useRouter} from 'next/router';

export default function AddBookToList(props) {
    const router = useRouter()

    console.log(props.booksInAllLists)

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
            const {data} = await axios.post('/api/booksonlist', {
                listId: listId,
                bookId: bookId
            })

            router.push(`/books`);

        } else {
            alert("book is already in your list!")
        }
    }
   
    return(
        <div>
            <h1>Which list do you want to add book {props.book.title} to?</h1>
                {props.lists.map(list => (
                    <div key={list.id}>
                        <button onClick={()=>handleAddBookToList(list.id, props.book.id)}>{list.title}</button>
                    </div>

                ))}
    
                <button onClick={()=>handleCancel()}>Cancel</button>
        </div>
    )
}


