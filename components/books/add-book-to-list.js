import axios from 'axios';
import {useRouter} from 'next/router';

export default function AddBookToList(props) {
    const router = useRouter()

    console.log(props.book)

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
                description: props.book.volumeInfo.description ? props.book.volumeInfo.description: "this is a"
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


