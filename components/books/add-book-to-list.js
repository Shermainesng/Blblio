import axios from 'axios';

export default function AddBookToList(props) {

    console.log(props.booksInAllLists)
    console.log(props.book)

    function handleCancel() {
        {props.setIsShown(false)}
    }

    async function handleAddBookToList(listId, bookId) {
        if(!bookId) {
            return <div>loading</div>

        } 
    
        const found = props.booksInAllLists.find(book => book.bookId ==  bookId && listId == listId);
        if (typeof found == 'undefined') {
            const {data} = await axios.post('/api/booksonlist', {
                listId: listId,
                bookId: bookId
            })
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


