
import {PrismaClient} from '@prisma/client';

export default function AddBookToList(props) {
    
    console.log(props.lists);
    // console.log("LISTS HERE " + props.lists)
    function handleCancel() {
        {props.setIsShown(false)}
    }

    function handleAddBookToList() {

    }

    return(
        <div>
            <h1>Which list do you want to add book {props.bookId} to?</h1>
                {props.lists.map(list => (
                    <div key={list.id}>
                        <button onClick={()=>handleAddBookToList()}>{list.title}</button>
                    </div>

                ))}
    
                <button onClick={()=>handleCancel()}>Cancel</button>
        </div>
    )
}

