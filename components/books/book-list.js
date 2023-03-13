import BookItem from "./book-item";

function BookList(props) {
    const { items, isDelete } = props;
    console.log(items.volumeInfo)
    return (
      <ul>
        {items.map(book => (
          <BookItem key={book.id} id={book.id} title={book.volumeInfo.title} author={book.volumeInfo.authors} description={book.volumeInfo.description} imageUrl={book.volumeInfo.imageLinks.thumbnail} isDelete={isDelete}/>
        ))}
      </ul>
    );
  }
  
  export default BookList;