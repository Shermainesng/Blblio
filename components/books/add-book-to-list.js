function AddBookToList(props) {
    console.log(props.bookId);
    function handleCancel() {
        {props.setIsShown(false)}
    }

    return(
        <div>
            <h1>Which list do you want to add book {props.bookId} to?</h1>
                <p>test list1</p>
                <p>test list2</p>
                <button onClick={()=>handleCancel()}>Cancel</button>
        </div>
    )
}

export default AddBookToList;